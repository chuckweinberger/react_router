import React from 'react'
import ReactDOM from 'react-dom'
import Layout from './pages/Layout'
import Dash from './pages/Dash'
import Stories from './pages/Stories'
import User from './components/User'
import Users from './pages/Users'

import { Router, Route, browserHistory, IndexRoute} from 'react-router'

const app = document.getElementById('app');

ReactDOM.render(
	<Router history={browserHistory}>
		<Route path="/" component={Layout}>
			<IndexRoute component={Dash}/>
			<Route path="/users" component={Users} />
				<Route path="/users/:userName" component={User} />
			<Route path="/stories" component={Stories} 	>
			</Route>
		</Route>
	</Router>
, app)