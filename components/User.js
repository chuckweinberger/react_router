// components/User

import React from 'react';
import { findUserById } from '../helpers';

export default React.createClass({
  
  getUser: function(userId){
      // route components are rendered with useful information, like URL params
      return findUserById(userId, this.props.store.users)    
  },
  
  componentWillMount: function() { //get the user who was clicked on the 1st time component User was mounted
    this.setState({
      // route components are rendered with useful information, like URL params
      user: this.getUser(this.props.params.userId)
    })
  },
  
   componentWillReceiveProps: function(nextProps) {  // when userId changes after component has mounted!
      if (nextProps.params.userId !== this.props.params.userId) {
        this.setState({
          // route components are rendered with useful information, like URL params
          user: this.getUser(nextProps.params.userId)
        })
      }
   },
  
	render(){ 
    
    const { user } = this.state;
    
		return(
			<div>
				<h2>{user.username}</h2>
			</div>
		)
	}
})