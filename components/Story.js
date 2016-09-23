// components/Story

import React, { propType } from 'react';
    
    export default ({ onClick, title, _id }) => (

			<a onClick={onClick}>
        <h4>{title || _id}</h4>
			</a>
    )
