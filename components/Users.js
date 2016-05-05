// components/Users.js

import React, { propType } from 'react'
import User from './User'
import UserDetails from './UserDetails'

    
    const userList = ({ users, showUser, onUserClick }) => (
      <div>
        <div className='col-sm-3 col-md-2 sidebar'>
          <h2>List of Users</h2>
          <ul>
            {users.map(user => 
              <li key={user._id}>
                <User {...user}
                      onClick={() => onUserClick(user._id)}
                />
              </li>
          )}
    		  </ul>
        </div>
        <div className='col-sm-9 col-sm-offset-3 col-md-10 col-md-offset-2 main'>
          <UserDetails showUser={ showUser} />
        </div>
      </div>
    )
    
    export default userList

