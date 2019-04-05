import React, { Component, PropTypes } from 'react'
import {
  BrowserRouter as Router,
  HashRouter,
  Route,
  Link,
} from 'react-router-dom'

function Home(params) {
  return (
    <div>
      <h2>home</h2>
    </div>
  )
}

function About(params) {
  return (
    <div>
      <h2>about page</h2>
    </div>
  )
}

class Demo extends Component {
  render() {
    return (
      <Router>
        <div>
          <Link to="/">Home</Link>
          <Link to="/about">About</Link>
          <Route exact path="/" component={Home} />
          <Route path="/about" component={About} />
        </div>
      </Router>
    )
  }
}

Demo.propTypes = {}

export default Demo
