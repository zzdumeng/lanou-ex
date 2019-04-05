import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom'
import AboutPage from './About'
import Section from '../comp/Section'
import Nav from '../comp/Nav'
import List from '../comp/List'
import PostList from '../comp/PostList'

export class HomePage extends Component {
  static propTypes = {}

  render() {
    console.log(this.props.match);
    
    let render
    if (this.props.match.url === '/about') {
      render = <AboutPage />
    } else {
      render = (
        <Router>
          <div>
            <Nav />
            <br />
            <Link to="/list/one">item one</Link>
            <Link to="/list/two">item two</Link>
            <h1>home page</h1>
            <PostList />
            <Switch>
              <Route path="/list/two" component={Section} />
              <Route path="/list/:id" component={List} />
            </Switch>
          </div>
        </Router>
      )
    }
    return render
  }
}

export default HomePage
