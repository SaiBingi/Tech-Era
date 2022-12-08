import {Component} from 'react'
import Loader from 'react-loader-spinner'
import Header from '../Header'
import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class CourseDetails extends Component {
  state = {courseDetails: {}, apiStatus: apiStatusConstants.initial}

  componentDidMount() {
    this.displayCourseDetails()
  }

  displayCourseDetails = async () => {
    this.setState({apiStatus: apiStatusConstants.inProgress})
    const {match} = this.props
    const {params} = match
    const {id} = params
    console.log(id)

    const apiUrl = `https://apis.ccbp.in/te/courses/${id}`
    const options = {method: 'GET'}
    const response = await fetch(apiUrl, options)
    console.log(response.ok)

    if (response.ok) {
      const data = await response.json()
      console.log(data)

      const formattedData = {
        id: data.course_details.id,
        description: data.course_details.description,
        name: data.course_details.name,
        imageUrl: data.course_details.image_url,
      }

      this.setState({
        courseDetails: formattedData,
        apiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  onRetry = () => this.displayCourseDetails()

  renderSuccessView = () => {
    const {courseDetails} = this.state
    const {description, name, imageUrl} = courseDetails

    return (
      <div className="course-details">
        <img src={imageUrl} alt={name} className="course-details-image" />
        <div className="course-details-content">
          <h1 className="name">{name}</h1>
          <p className="description">{description}</p>
        </div>
      </div>
    )
  }

  renderFailureView = () => (
    <div className="failure-container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/tech-era/failure-img.png"
        alt="failure view"
        className="failure-view"
      />
      <h1 className="error-msg-1">Oops! Something Went Wrong</h1>
      <p className="error-msg-2">
        We cannot seem to find the page you are looking for.
      </p>
      <button type="button" className="retry-button" onClick={this.onRetry}>
        Retry
      </button>
    </div>
  )

  renderLoadingView = () => (
    <div data-testid="loader" className="loading-view">
      <Loader type="ThreeDots" color=" #4656a1" height={50} width={50} />
    </div>
  )

  renderData = () => {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderSuccessView()
      case apiStatusConstants.failure:
        return this.renderFailureView()
      case apiStatusConstants.inProgress:
        return this.renderLoadingView()
      default:
        return null
    }
  }

  render() {
    return (
      <div>
        <Header />
        <div className="container">{this.renderData()}</div>
      </div>
    )
  }
}

export default CourseDetails
