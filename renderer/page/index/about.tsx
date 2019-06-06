import React,{ Component } from 'react'
import { RouteComponentProps } from 'react-router-dom'

export default class About extends Component<RouteComponentProps<any>, any>{
  render() {
    const {history} = this.props
    return (
      <div>
        <h2>About</h2>
        <button className="btn" onClick={history.goBack}>
          <i className="fa fa-arrow-left" />
        </button>
      </div>
    )
  }
}