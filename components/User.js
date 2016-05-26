// components/User

import React, { propType } from 'react';
    
    export default ({ onClick, username, email }) => (

			<a onClick={onClick}>
        <h4>{username}</h4>
			</a>
    )
