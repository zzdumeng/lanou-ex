import React, { Component } from 'react'
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'
import HomePage from './pages/Home'
import AboutPage from './pages/About'
import logo from './logo.svg'
import './App.css'
import Nav from './comp/Nav'

class App extends Component {
  componentDidCatch(err) {
    console.log(err)
  }
  render() {
    return (
      <Router>
        <div className="App">
          <Route path="/" exact component={HomePage} />
          <Route path="/about" exact component={AboutPage} />
        </div>
      </Router>
    )
  }
}

export default App
