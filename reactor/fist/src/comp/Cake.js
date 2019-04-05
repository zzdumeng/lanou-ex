import React, { Component } from 'react'
import PropTypes from 'prop-types'

export class Cake extends Component {
  static propTypes = {
    cake: PropTypes.any,
  }

  render() {
    console.log(this.props)
    return (
      <div>
        <b>brand :</b>
        <span>{this.props.cake.brand}</span>
      </div>
    )
  }
}

export default Cake
