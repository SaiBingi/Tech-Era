import {Link} from 'react-router-dom'
import './index.css'

const Course = props => {
  const {courseDetails} = props
  const {id, logoUrl, name} = courseDetails

  return (
    <Link to={`/courses/${id}`} className="link">
      <li className="course-container">
        <img src={logoUrl} alt={name} className="logo-url" />
        <p className="course-name">{name}</p>
      </li>
    </Link>
  )
}

export default Course
