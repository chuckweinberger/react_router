// components/User

import React, { propType } from 'react';
    
    export default ({ onClick, username, email, _id }) => (

			<a onClick={onClick}>
        <h4>{username || email || _id}</h4>
			</a>
    )
