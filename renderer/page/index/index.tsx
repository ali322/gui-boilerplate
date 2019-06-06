import * as React from 'react'
import { render } from 'react-dom'
import { AppContainer } from 'react-hot-loader'
import Router from './router'

render(<AppContainer>
  <Router />
</AppContainer>, document.getElementById('app'))

if ((module as any).hot) {
  (module as any).hot.accept('./router', () => {
    const Next = require('./router').default
    render(<AppContainer>
      <Next />
    </AppContainer>, document.getElementById('app'))
  })
}
