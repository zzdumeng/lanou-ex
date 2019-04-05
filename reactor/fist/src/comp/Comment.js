import React, { Component } from 'react'
import PropTypes from 'prop-types'

import  './Comment.css'

export class Comment extends Component {
  static propTypes = {
    user: PropTypes.shape({
      name: PropTypes.string,
      avatar: PropTypes.string,
    }),
    publishDate: PropTypes.string,
    content: PropTypes.string,
  }

  render() {
    const {user: {name, avatar},
  publishDate, content} = this.props
    return (
      <div className="comment">
      <img src={avatar} alt=""/>
       <div className="content">{content}</div>
      </div>
    )
  }
}

export default Comment
