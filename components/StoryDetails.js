// components/StoryDetails

import React from 'react';

    
    const StoryDetails = ({ showingItem, createNewItemClick }) => (
			<div className={(showingItem.type !== "story") ? 'hidden' : 'page-header'}>
				<h2>{ showingItem && showingItem.title}.</h2>
        <input type='submit' value='Add to this Story' class='btn btn-default'
            onClick={(showingItem)=> createNewItemClick('post')}
        />
			</div>
		)

  
  export default StoryDetails