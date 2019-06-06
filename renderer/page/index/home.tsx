import * as React from 'react'
import { Link } from 'react-router-dom'
import { inject } from 'mobx-react'

@inject((store: any) => {
  return {
    count: store.root.count,
    increase: store.root.increase,
    decrease: store.root.decrease,
  }
})
export default class Home extends React.Component<any, any>{
  render() {
    const {count, increase, decrease} = this.props
    return (
      <div>
        <h2>Home</h2>
        <p>{count}</p>
        <button onClick={increase}>increase</button>
        <button onClick={decrease}>decrease</button>
        <div>
          <Link to="about">go to about</Link>
        </div>
      </div>
    )
  }
}