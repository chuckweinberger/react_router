import React from 'react'
import ReactDOM from 'react-dom'
import { Router, Route, browserHistory, IndexRoute} from 'react-router'
import { Provider } from 'react-redux'
// import store from './store'
import Layout from './pages/Layout'
import Dash from './pages/Dash'
import Stories from './pages/Stories'
import ListContainer from './pages/ListContainer' 
import NoMatch from './pages/NoMatch'
import axios from 'axios'
import { purgeUsers } from './actions/userActions'

import { applyMiddleware, createStore, compose } from "redux"
import logger from "redux-logger"
import promise from "redux-promise-middleware"
import reducer from "./reducers"
import thunk from "redux-thunk"

import { createDevTools } from 'redux-devtools'
import LogMonitor from 'redux-devtools-log-monitor'
import DockMonitor from 'redux-devtools-dock-monitor'
import { routerReducer, syncHistoryWithStore, routerMiddleware } from 'react-router-redux'

axios.defaults.baseURL = 'http://api.newswick.com/api';

const app = document.getElementById('app');
const baseHistory = browserHistory
//const middleware = applyMiddleware(promise(), thunk, logger())
const routingMiddleware = routerMiddleware(baseHistory)

const DevTools = createDevTools(
  <DockMonitor toggleVisibilityKey="ctrl-h"
               changePositionKey="ctrl-q">
    <LogMonitor theme="tomorrow" />
  </DockMonitor>
)

const enhancer = compose(
  // Middleware you want to use in development:
  applyMiddleware(routingMiddleware, promise(), thunk),
  DevTools.instrument()
)

const store = createStore(reducer, enhancer)
const history = syncHistoryWithStore(baseHistory, store)

ReactDOM.render(
  <Provider store={store}>
    <div>
      <Router history={history}>
        <Route path="/" component={Layout}>
          <IndexRoute component={Dash} />
          <Route path="/stories" component={() => (<ListContainer listType="stories"/>)}  />
          <Route path="/users" component={() => (<ListContainer listType="users"/>)} />
          <Route path="/groups" component={() => (<ListContainer listType="groups"/>)} />
          <Route path="*" component={NoMatch} />
        </Route>
      </Router>
      <DevTools />
    </div>
  </Provider>
  , app)