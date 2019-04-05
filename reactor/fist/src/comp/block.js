import React, { Component } from 'react'
import PropTypes from 'prop-types'

export class Block extends Component {
  constructor(props) {
    super(props)
    this.state = {
      opacity: 1,
      rotation: 0,
    }
    this.dir = 1
  }

  static propTypes = {}
  componentDidMount() {
    // this.timer = setInterval(() => {

    // }, 1)
    window.requestAnimationFrame(this.updateOpacity)
  }
  updateOpacity = () => {
    if(this.state.opacity<0 || this.state.opacity>1){
      this.dir *= -1
    }
    this.setState((state) => ({
      opacity: state.opacity - this.dir * 0.01,
      rotation: state.rotation + 2,
    }))
    window.requestAnimationFrame(this.updateOpacity)
  }
  render() {
    return (
      <div
        style={{
          opacity: this.state.opacity,
          transform: `rotateZ(${this.state.rotation}deg)`,
          width: 300,
          height: 300,
          backgroundColor: '#ff0',
        }}
      />
    )
  }
}

export default Block
