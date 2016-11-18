// components/Story
import TimeAgo from 'react-timeago'

import React, { propType } from 'react';
    
    export default ({ onClick, story }) => (

			<div class="accordion-item-content" onClick={onClick}>
        <div>No. of posts: {story.posts.length}</div>
        <div>Created: <TimeAgo date={story.created} /></div>
        <div>Last Updated: <TimeAgo date={story.posts[0].created} /></div>
      </div>
    )
