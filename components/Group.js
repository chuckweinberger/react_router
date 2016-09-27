// components/Group

import React, { propType } from 'react';
    
    export default ({ onClick, groupname, _id }) => (

			<a onClick={onClick}>
        <h4>{groupname || _id}</h4>
			</a>
    )
