import React, { Component } from 'react'
import PropTypes from 'prop-types'
import axios from 'axios'
import {from} from 'rxjs'
import {map} from 'rxjs/operators'
import Cake from './Cake'

export class CakeList extends Component {
  constructor(props) {
    super(props)
    this.state = {
      cakes: []
    }
  }
  static propTypes = {

  }
  componentDidMount = () => {
    from(axios.get('https://untitled-nv4jhofqu56q.runkit.sh/'))
    .pipe(map(res => res.data))
    .subscribe(data => this.setState({cakes: data}))
    // axios.get('https://untitled-nv4jhofqu56q.runkit.sh/')
    // .then(res => this.setState({cakes: res.data}))
    // .then(c => console.log(c))
  }
  
  render() {
    return (
      <div>
        <h2>cakes</h2>
        {this.state.cakes.map(cake => <Cake cake={cake}/>)}
      </div>
    )
  }
}

export default CakeList
