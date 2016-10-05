import React from 'react'
import ReactDOM from 'react-dom'
import { Router, Route, browserHistory, IndexRoute} from 'react-router'
import { Provider } from 'react-redux'

//necessary components and pages
import Login from './components/Login'
import Layout from './pages/Layout'
import Dash from './pages/Dash'
import Stories from './pages/Stories'
import ListContainer from './pages/ListContainer' 
import NoMatch from './pages/NoMatch'

//necessary actions
import { restore } from './actions/currentUserActions'

import { UserIsAuthenticated, UserIsAdmin } from './utils/wrappers.js'
import axios from 'axios'

import { applyMiddleware, createStore, compose } from "redux"
import logger from "redux-logger"
import promise from "redux-promise-middleware"
import reducer from "./reducers"
import thunk from "redux-thunk"

import { createDevTools } from 'redux-devtools'
import LogMonitor from 'redux-devtools-log-monitor'
import DockMonitor from 'redux-devtools-dock-monitor'
import { routerReducer, syncHistoryWithStore, routerMiddleware } from 'react-router-redux'

const app = document.getElementById('app');
const baseHistory = browserHistory
const routingMiddleware = routerMiddleware(baseHistory)

//dock for displaying actions and the store in development mode
const DevTools = createDevTools(
  <DockMonitor toggleVisibilityKey="ctrl-h"
               changePositionKey="ctrl-q">
    <LogMonitor theme="tomorrow" />
  </DockMonitor>
)

const enhancer = compose(
  applyMiddleware(routingMiddleware, promise(), thunk),
  DevTools.instrument()
)

const store = createStore(reducer, enhancer)
const history = syncHistoryWithStore(baseHistory, store)

//attempt to restore the currentUser from localStorage
store.dispatch(restore);

//set defaults for REST service
axios.defaults.baseURL = 'http://api.newswick.com/api';
axios.interceptors.request.use(function(config) {
  const currentUser = JSON.parse(localStorage.getItem('currentUser'))
  if(currentUser){
    console.log("adding the currentUser's access token to http header requests");
    config.headers.common['Authorization'] = "Bearer " + currentUser.auth.accessToken.token ;
  } else {
    config.headers.common['Authorization'] = null;
    console.log("removing access token as we don't have a logged-in user");
  }
  return config;
})

ReactDOM.render(
  <Provider store={store}>
    <div>
      <Router history={history}>
        <Route path="/" component={Layout}>
          <IndexRoute component={Dash} />
          <Route path="login" component={Login}/>
          <Route path="/stories" component={ () => (<ListContainer listType="stories"/>) } />
          <Route path="/users" component={ () => (<ListContainer listType="users"/>) } />
          <Route path="/groups" component={ UserIsAuthenticated(() => (<ListContainer listType="groups"/>)) } />
          <Route path="*" component={NoMatch} />
        </Route>
      </Router>
      <DevTools />
    </div>
  </Provider>
  , app)