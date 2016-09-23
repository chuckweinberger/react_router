import React from 'react'
import ReactDOM from 'react-dom'
import { Router, Route, browserHistory, IndexRoute} from 'react-router'
import { Provider } from 'react-redux'
import store from './store'
import Layout from './pages/Layout'
import Dash from './pages/Dash'
import Stories from './pages/Stories'
import ListContainer from './pages/ListContainer' 
import NoMatch from './pages/NoMatch'
import axios from 'axios'
import { purgeUsers } from './actions/userActions'

axios.defaults.baseURL = 'http://api.newswick.com/api';
  
const app = document.getElementById('app');

ReactDOM.render(
  <Provider store={store}>
    <Router history={browserHistory}>
      <Route path="/" component={Layout}>
        <IndexRoute component={Dash} />
        <Route path="/stories" component={() => (<ListContainer listType="stories"/>)}  />
        <Route path="/users" component={() => (<ListContainer listType="users"/>)} />
        <Route path="/groups" component={() => (<ListContainer listType="groups"/>)} />
        <Route path="*" component={NoMatch} />
      </Route>
    </Router>
  </Provider>
  , app)