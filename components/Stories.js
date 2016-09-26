// components/Users.js

import React, { propType } from 'react'
import Story from './Story'
import StoryDetails from './StoryDetails'


export default ({ items, showingItemId, onItemClick, onFetchMoreItemsClick}) => (
  <div>
    <div className='col-sm-3 col-md-2 sidebar'>
      <h2>List of Stories</h2>
      <ul>
        {items.map(story => 
          <li key={story._id}>
            <Story {...story}
                  onClick={() => onItemClick(story._id)}
            />
          </li>
      )}
		  </ul>
      <button type="button" onClick={() => onFetchMoreItemsClick("stories")}>Fetch More</button>
    </div>
    <div className='col-sm-9 col-sm-offset-3 col-md-10 col-md-offset-2 main'>
      <StoryDetails showingItemId={ showingItemId } />
    </div>
  </div>
)
