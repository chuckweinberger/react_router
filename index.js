import React from 'react'
import ReactDOM from 'react-dom'
import { Router, Route, browserHistory, IndexRoute} from 'react-router'
import { Provider } from 'react-redux'
import { createStore } from 'redux' 

import Layout from './pages/Layout'
import Dash from './pages/Dash'
import Stories from './pages/Stories'
import UserListContainer from './pages/UserListContainer' 
import NoMatch from './pages/NoMatch'
import reducer from './reducers/index.js' 
import { addUser } from './creators/userCreators' 

const app = document.getElementById('app');

let users = [ { username: "Chuck", email: "cweinberger@gmail.com" },
              { username: "Aron", email: "aron@gmail.com" },
              { username: "Bob", email: "bob@gmail.com" }
            ];
                

let store = createStore(reducer);
const { getState, dispatch } = store;

let unsubscribe = store.subscribe(() =>
  console.log(store.getState())
)

users.map(user => dispatch(addUser(user) ));

ReactDOM.render(
  <Provider store={store}>
    <Router history={browserHistory}>
      <Route path="/" component={Layout}>
        <IndexRoute component={Dash} />
        <Route path="/stories" component={Stories} />
        <Route path="/users" component={UserListContainer}/>
        <Route path="*" component={NoMatch} />
      </Route>
    </Router>
  </Provider>
  , app)