// components/User

import React, { propType } from 'react';
    
    const User = ({ onClick, username, email }) => (

			<a
        onClick={onClick}
      >
        <h4>{username}</h4>
			</a>
    )

export default User