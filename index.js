import React from 'react'
import ReactDOM from 'react-dom'
import Layout from './pages/Layout'
import Dash from './pages/Dash'
import Stories from './pages/Stories'
import User from './components/User'
import Users from './pages/Users'
import NoMatch from './pages/NoMatch'

import { Router, Route, browserHistory, IndexRoute} from 'react-router'

const app = document.getElementById('app');

const store = {
                users: [ { username: "Chuck", email: "cweinberger@gmail.com", _id: "1" },
                  { username: "Aron", email: "aron@gmail.com", _id: "2" },
                  { username: "Bob", email: "bob@gmail.com", _id: "3" }
                ],
                stories: []
              };

const createElement = (Component, props) => {
  return <Component store={store} {...props} />
};

ReactDOM.render(
	<Router history={browserHistory} createElement={createElement}>
		<Route path="/" component={Layout}>
			<IndexRoute component={Dash}/>
			<Route path="stories" component={Stories} />
			<Route path="users" component={Users} />
			<Route component={Users}>
        <Route path="user/:userId" component={User} />
      </Route>

      <Route path="*" component={NoMatch} />
		</Route>
	</Router>
, app)