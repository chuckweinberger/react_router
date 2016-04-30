// pages/Users.js

import NavLink from '../components/NavLink';
import React from 'react';
import { usersReducer } from '../reducers';
import { Link } from 'react-router';
import {createStore} from 'redux';

export default class Dash extends React.Component {
  
	render(){

    console.log(typeof(usersReducer));
    const store = createStore(usersReducer);
    const {getState} = store;
    const {users} = getState();

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