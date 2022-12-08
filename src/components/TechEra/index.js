import {Component} from 'react'
import Loader from 'react-loader-spinner'
import Header from '../Header'
import Course from '../Course'
import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class TechEra extends Component {
  state = {coursesList: [], apiStatus: apiStatusConstants.initial}

  componentDidMount() {
    this.displayCourses()
  }

  displayCourses = async () => {
    this.setState({apiStatus: apiStatusConstants.inProgress})

    const apiUrl = 'https://apis.ccbp.in/te/courses'
    const options = {method: 'GET'}
    const response = await fetch(apiUrl, options)
    console.log(response.ok)

    if (response.ok) {
      const data = await response.json()
      console.log(data)

      const formattedData = data.courses.map(eachCourse => ({
        id: eachCourse.id,
        logoUrl: eachCourse.logo_url,
        name: eachCourse.name,
      }))

      this.setState({
        coursesList: formattedData,
        apiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  onRetry = () => this.displayCourses()

  renderSuccessView = () => {
    const {coursesList} = this.state

    return (
      <>
        <h1 className="heading">Courses</h1>
        <ul className="courses-container">
          {coursesList.map(eachCourse => (
            <Course key={eachCourse.id} courseDetails={eachCourse} />
          ))}
        </ul>
      </>
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

export default TechEra
