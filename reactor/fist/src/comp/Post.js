import React, { Component } from 'react'
import PropTypes from 'prop-types'
import axios from 'axios'
import { from } from 'rxjs'
import { map } from 'rxjs/operators'
import CommentBox from './CommentBox'
import CommentArea from './CommentArea'

import './Post.css'
export class Post extends Component {
  constructor(props) {
    super(props)
    this.state = {
      upvotes: props.upvotes,
      upvoted: false,
      commenting: false,
    }
  }

  static propTypes = {
    user: PropTypes.shape({ name: PropTypes.string, avatar: PropTypes.string }),
    publishDate: PropTypes.string,
    content: PropTypes.string,
    upvotes: PropTypes.number,
  }
  upvote = () => {
    let d = this.state.upvoted ? -1 : 1
    this.setState((state) => ({
      upvoted: !state.upvoted,
      upvotes: state.upvotes + d,
    }))
  }
  comment = () => {
    // get coments
    this.setState({ commenting: !this.state.commenting })
  }
  render() {
    const {
      user: { name, avatar },
      upvotes,
      publishDate,
      content,
    } = this.props
    return (
      <li className="post">
        <div className="main">
          <img src={avatar} alt="" />
          <div className="detail">
            <div className="header">
              <h4>{name}</h4>
              <span>{publishDate}</span>
            </div>
            <div className="content">{content}</div>
            <div className="actions">
              <button className="action" onClick={this.upvote}>
                upvote{' '}
                <span className={this.state.upvoted ? 'upvoted' : ''}>
                  {this.state.upvotes}
                </span>
              </button>

              <button className="action" onClick={this.comment}>
                comment
              </button>
            </div>
          </div>
        </div>
        <CommentArea show={this.state.commenting} />
      </li>
    )
  }
}

export default Post
