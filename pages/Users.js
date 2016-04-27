// pages/Users.js

import NavLink from '../components/NavLink';
import React from 'react';

export default class Dash extends React.Component {

	render(){
		return (
    	<div>
    		<h3>Users</h3>
    		<ul>
    			<li><NavLink to="/users/Chuck">Chuck</NavLink></li>
    			<li><NavLink to="/users/Aron">Aron</NavLink></li>
    		</ul>

    		{this.props.children}
    	</div>
    )
	}
}