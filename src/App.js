// Published URL  ==>  https://saitecheraapp.ccbp.tech

import {Route, Switch, Redirect} from 'react-router-dom'
import TechEra from './components/TechEra'
import CourseDetails from './components/CourseDetails'
import NotFound from './components/NotFound'
import './App.css'

const App = () => (
  <Switch>
    <Route exact path="/" component={TechEra} />
    <Route exact path="/courses/:id" component={CourseDetails} />
    <Route exact path="/not-found" component={NotFound} />
    <Redirect to="/not-found" />
  </Switch>
)

export default App
