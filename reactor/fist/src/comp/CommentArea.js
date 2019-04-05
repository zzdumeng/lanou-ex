import React, { Component } from 'react'
import PropTypes from 'prop-types'
import axios from 'axios'
import { from } from 'rxjs'
import { map } from 'rxjs/operators'
import CommentBox from './CommentBox'
import Comment from './Comment'

import './CommentArea.css'
export class CommentArea extends Component {
  constructor(props) {
    super(props)
    this.state = {
      comments: [],
    }
  }

  static propTypes = {
    show: PropTypes.bool,
    onSubmit: PropTypes.func,
  }

  componentDidMount = () => {}
  componentWillReceiveProps = (nextProps) => {
    if (nextProps.show && this.state.comments.length === 0) {
      // get comments
      from(axios.get(`https://untitled-10clau41qcyw.runkit.sh?type=comments`))
        .pipe(map((res) => res.data))
        .subscribe((data) => this.setState({ comments: data }))
    }
  }

  submitComment = ({ user, content }) => {
    // get coments
    // simulate the submit error
    console.log(this)
    const success = Math.random() > 0.5 ? true : false
    if (success) {
      // const old = Array.from(this.state.comments)
      // old.unshift({
      //   user,
      //   content,
      //   publishDate: new Date(),
      // })
      // this.setState({
      //   comments: old,
      // })
      this.setState({
        comments: [{
          user,
          content,
          publishDate: new Date(),
        }, ...(this.state.comments)],
      })
      return new Promise((res, rej) => res(0))
    } else {
      return new Promise((res, rej) => res({ error: 1 }))
    }
  }
  render() {
    return (
      <div
        style={{ display: this.props.show ? 'flex' : 'none' }}
        className="comment-area"
      >
        <CommentBox onSubmit={this.submitComment} />
        <ul>
          {this.state.comments.map((comment) => (
            <Comment {...comment} />
          ))}
        </ul>
      </div>
    )
  }
}

export default CommentArea
