import React from 'react'
import ReactDOM from 'react-dom'
import { Router, Route, browserHistory, IndexRoute} from 'react-router'
import { Provider } from 'react-redux'
import store from './store'
import Layout from './pages/Layout'
import Dash from './pages/Dash'
import Stories from './pages/Stories'
import UsersListContainer from './pages/UsersListContainer' 
import NoMatch from './pages/NoMatch'
import axios from 'axios'

const app = document.getElementById('app');

ReactDOM.render(
  <Provider store={store}>
    <Router history={browserHistory}>
      <Route path="/" component={Layout}>
        <IndexRoute component={Dash} />
        <Route path="/stories" component={Stories} />
        <Route path="/users" component={UsersListContainer}/>
        <Route path="*" component={NoMatch} />
      </Route>
    </Router>
  </Provider>
  , app)