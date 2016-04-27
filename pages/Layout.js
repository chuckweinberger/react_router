import React from 'react'
import NavLink from '../components/NavLink'
import {IndexLink} from 'react-router'

export default React.createClass({
	render() {
    return (
    	<div>
	    	<h1>React Router Tutorial</h1>
	    	<ul role="nav">
	    		<NavLink className="btn btn-success" onlyActiveOnIndex={true} to="/" >Home</NavLink>
	    		<NavLink className="btn btn-success" to="/about" >About</NavLink>
	    		<NavLink className="btn btn-success" to="/repos" >Repos</NavLink>
	    	</ul>

	    	{this.props.children}

    	</div>
  	)
	}
})
