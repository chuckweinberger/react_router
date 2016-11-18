// components/Users.js

import React, { propType } from 'react'
import User from './User'
import UserDetails from './UserDetails'

export default class Users extends React.Component {
  render(){
    
    const { items, showingItem, onItemClick, totalRows, onFetchMoreItemsClick} = this.props;
    
    return (
      <div>
        <div className='col-sm-3 col-md-2 sidebar'>
          <h2>List of Users</h2>
          <ul>
            {items.map(item => 
              <li key={item._id}>
                <User {...item}
                      onClick={() => onItemClick(item)}
                />
              </li>
          )}
      	  </ul>
          { items.length < totalRows && <button type="button" onClick={() => onFetchMoreItemsClick("users")}>Fetch More</button> }
        </div>
        <div className='col-sm-9 col-sm-offset-3 col-md-10 col-md-offset-2 main'>
          <UserDetails showingItem={ showingItem } />
        </div>
      </div>
      
    ) 
  }
}
