import React, { Component } from 'react'
import PropTypes from 'prop-types'
import  './CommentBox.css'

export class CommentBox extends Component {
  constructor (props) {
    super(props)
    this.state = {
      content: ''
    }
  }
  
  static propTypes = {
    user: PropTypes.shape({
      name: PropTypes.string,
      avatar: PropTypes.string,
    }),
    onSubmit: PropTypes.func,
  }
  static defaultProps = {
    user: {},
    onSubmit: ()=>{},
  }
  onSubmit = () => {
    this.props.onSubmit({user: this.props.user, content: this.state.content})
    .then((res) => {
      if(res.error) {
        alert('submit error. Try later.')
      } else {
        this.setState({content: ''})
      }
    })
  }
  // soem 
  render() {
    return (
      <div className="comment-box" >
      <img src={this} alt=""/>
      <div className="right">
        <textarea className="edit" onChange={(e) => this.setState({content: e.target.value})}
         value={this.state.content}></textarea>
        <input type="submit" value="提交" onClick={this.onSubmit}/>
      </div>
      </div>
    )
  }
}

export default CommentBox
