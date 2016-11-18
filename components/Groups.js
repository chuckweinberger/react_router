// components/Groups.js

import React, { propType } from 'react'
import Group from './Group'
import GroupDetails from './GroupDetails'


export default class Groups extends React.Component {
  render(){
    
    const { items, showingItem, onItemClick, totalRows, onFetchMoreItemsClick} = this.props;
    
    return (
      <div>
        <div className='col-sm-3 col-md-2 sidebar'>
          <h2>List of Groups</h2>
          <ul>
            {items.map(item => 
              <li key={item._id}>
                <Group {...item}
                      onClick={() => onItemClick(item)}
                />
              </li>
          )}
      	  </ul>
          { items.length < totalRows && <button type="button" onClick={() => onFetchMoreItemsClick("groups")}>Fetch More</button> }
        </div>
        <div className='col-sm-9 col-sm-offset-3 col-md-10 col-md-offset-2 main'>
          <GroupDetails showingItem={ showingItem } />
        </div>
      </div>
      
    ) 
  }
}

