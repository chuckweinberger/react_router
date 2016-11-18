// components/StoryDetails

import React from 'react';

    
    const groupDetails = ({ showingItem }) => (
			<div className={(showingItem.type !== "group") ? 'hidden' : 'page-header'}>
				<h2>Here are the details for group {showingItem.name}.</h2>
			</div>
		)

  
  export default groupDetails