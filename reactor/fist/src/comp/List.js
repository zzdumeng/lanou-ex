import React, { Component } from 'react'
import PropTypes from 'prop-types'

export class List extends Component {
  static defaultProps = {
    items: ['<no items>']
  }
  static propTypes = {

  }

  render() {
    return (
      <div>
        <h1>items</h1>
        {this.props.items.map((item) => 
        (<p>{item}</p>))}
        <br/>
        the id is {this.props.match.params.id}
      </div>
    )
  }
}

export default List
