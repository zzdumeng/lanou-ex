import React, { Component } from 'react'
import { Route, Link, Redirect } from 'react-router-dom'
import AboutPage from '../pages/About'
class Nav extends Component {
  constructor(props) {
    super(props)
    this.state = {
      url: ''
    }
  }
  goAbout = () => {
    this.setState({url: '/about'})
  }
  render() {
    if(this.state.url === '/about') {
      return (<Redirect to="/about" />)
    }
    return (
      <>
        <nav>
          <Link to="/">Home</Link>
          <Link to="/list">List</Link>
          {/* <Link replace to="/about">About</Link> */}
          <button onClick={this.goAbout}>About</button>
        </nav>
        {/* <Route path="/about" render={() => <Redirect to="/about" />} /> */}
      </>
    )
  }
}

export default Nav
