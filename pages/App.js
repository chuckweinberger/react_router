import React from 'react'
import NavLink from '../components/NavLink'
import {IndexLink} from 'react-router'

export default React.createClass({
	render() {
    return (
    	<div>
	    	<h1>React Router Tutorial</h1>
	    	<ul role="nav">
	    		<li><NavLink onlyActiveOnIndex={true} to="/" activeClassName="active">Home</NavLink></li>
	    		<li><NavLink to="/about" activeClassName="active">About</NavLink></li>
	    		<li><NavLink to="/repos" activeClassName="active">Repos</NavLink></li>
	    	</ul>

	    	{this.props.children}

    	</div>
  	)
	}
})
