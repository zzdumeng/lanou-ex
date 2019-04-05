import React, { Component } from 'react'
import PropTypes from 'prop-types'
import {from, fromEvent} from 'rxjs'
import {map} from 'rxjs/operators'

export class Rx extends Component {
  constructor (props, context) {
    super(props, context)
    this.state = {
      value: ''
    }
  }
  
  static propTypes = {

  }
  componentDidMount = () => {
    fromEvent(this.inputRef, 'input')
    .pipe(
      map(ev => ev.target.value)
    ).subscribe(v => console.log(v))
  }
  
  onChange = (e) => {
  }
  render() {
    return (
      <div>
          <input ref={(r)=>this.inputRef = r} type="text" 
          // value={this.state.value}
          onChange={this.onChange}/>
      </div>
    )
  }
}

export default  Rx
