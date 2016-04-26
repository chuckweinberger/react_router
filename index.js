import React from 'react'
import ReactDOM from 'react-dom'
import Layout from './pages/Layout'
import About from './pages/About'
import Repos from './pages/Repos'
import Repo from './components/Repo'
import Home from './pages/Home'

import { Router, Route, browserHistory, IndexRoute} from 'react-router'

const app = document.getElementById('app');

ReactDOM.render(
	<Router history={browserHistory}>
		<Route path="/" component={Layout}>
			<IndexRoute component={Home}/>
			<Route path="/about" component={About} />
			<Route path="/repos" component={Repos} 	>
				<Route path="/repos/:userName/:repoName" component={Repo} />
			</Route>
		</Route>
	</Router>
, document.getElementById('app'))