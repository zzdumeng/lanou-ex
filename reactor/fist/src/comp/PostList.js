import React, { Component } from 'react'
import PropTypes from 'prop-types'
import axios from 'axios'
import { from } from 'rxjs'
import { map } from 'rxjs/operators'
import Post from './Post'

import  './PostList.css'
export class PostList extends Component {
  constructor (props) {
    super(props)
    this.state = {
      posts: []
    }
  }
  
  componentDidMount() {
    from(axios.get('https://untitled-10clau41qcyw.runkit.sh?type='+'posts'))
    .pipe(map((res) => res.data))
    .subscribe(posts => this.setState({posts}))
  }
  static propTypes = {}

  render() {
    return ( <ul>
      {this.state.posts.map((post) => (
        <Post {...post} key={post.id}/>
      ))}

    </ul> )
  }
}

export default PostList
