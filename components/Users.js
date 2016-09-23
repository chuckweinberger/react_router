// components/Users.js

import React, { propType } from 'react'
import User from './User'
import UserDetails from './UserDetails'


export default ({ items, showingItemId, onItemClick}) => (
  <div>
    <div className='col-sm-3 col-md-2 sidebar'>
      <h2>List of Users</h2>
      <ul>
        {items.map(user => 
          <li key={user._id}>
            <User {...user}
                  onClick={() => onItemClick(user._id)}
            />
          </li>
      )}
		  </ul>
    </div>
    <div className='col-sm-9 col-sm-offset-3 col-md-10 col-md-offset-2 main'>
      <UserDetails showingItemId={ showingItemId } />
    </div>
  </div>
)
