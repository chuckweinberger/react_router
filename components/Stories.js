// components/Stories.js

import React, { propType } from 'react'
import Story from './Story'
import StoryDetails from './StoryDetails'


export default class Stories extends React.Component {
  render(){
    
    const { items, showingItemId, onItemClick, totalRows, onFetchMoreItemsClick, createNewItemClick} = this.props;
    
    return (
      <div>
        <div className='col-sm-3 col-md-2 sidebar'>
          <input type='submit' value='Create a new Story' class='btn btn-default'
              onClick={()=> createNewItemClick('story')}
          />
          <h2>List of Stories</h2>
          <ul>
            {items.map(item => 
              <li key={item._id}>
                <Story {...item}
                      onClick={() => onItemClick(item._id)}
                />
              </li>
          )}
      	  </ul>
          { items.length < totalRows && <button type="button" onClick={() => onFetchMoreItemsClick("stories")}>Fetch More</button> }
        </div>
        <div className='col-sm-9 col-sm-offset-3 col-md-10 col-md-offset-2 main'>
          <StoryDetails showingItemId={ showingItemId } />
        </div>
      </div>
      
    ) 
  }
}

