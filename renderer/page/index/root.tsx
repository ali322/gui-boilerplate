import * as React from 'react'
import { HashRouter as Router, Route, Switch} from 'react-router-dom'
import { Provider } from 'mobx-react'
import { hot } from 'react-hot-loader'
import Home from './home'
import About from './about'
import rootStore from './store'

const Root =  () => (
  <Provider root={rootStore}>
    <Router>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/about" component={About} />
      </Switch>   
    </Router>
  </Provider>
)

export default hot(module)(Root)