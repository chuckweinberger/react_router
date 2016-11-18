// components/UserDetails

import React from 'react';

    
    const UserDetails = ({ showingItem }) => (
			<div className={(showingItem.type !== "user") ? 'hidden' : 'page-header'}>
				<h2>Here are the details for {showingItem.username}.</h2>
			</div>
		)

  
  export default UserDetails