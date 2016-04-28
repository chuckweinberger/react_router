// pages/Users.js

import NavLink from '../components/NavLink';
import React from 'react';
import { Link } from 'react-router';

export default class Dash extends React.Component {

	render(){
    
    console.log(this.props);
    
    const { store } = this.props;
    const { users } = store;      
    
		return (
    	<div>
    		<h3>Users</h3>
    		<ul>
          {users.map((user, i) => {
            return <li key={i}><Link store={store} to={`/user/${user._id}`}>{user.username}</Link></li>;
          })}
    		</ul>

    		{this.props.children} 
    	</div>
    )
	}
}