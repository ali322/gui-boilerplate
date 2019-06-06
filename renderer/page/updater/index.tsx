import * as React from 'react'
import { render } from 'react-dom'
import App from './app'

render(<App />, document.getElementById('app'))

if ((module as any).hot) {
  (module as any).hot.accept('./app', () => {
    const Next = require('./app').default
    render(<Next />, document.getElementById('app'))
  })
}
