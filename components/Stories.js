// components/Stories.js

import React, { propType } from 'react'
import Story from './Story'
import StoryDetails from './StoryDetails'


export default class Stories extends React.Component {
  render(){
    
    const { items, showingItem, onItemClick, totalRows, onFetchMoreItemsClick, createNewItemClick} = this.props;
    
    return (
      <div>
        <div className='col-sm-3 col-md-2 sidebar'>
          <input type='submit' value='Create a new Story' class='btn btn-default'
              onClick={()=> createNewItemClick('story')}
          />
          <h2>List of Stories</h2>
          <div class="accordion">
            {items.map((item, i) => 
              <section class="accordion-item" key={i} onClick={() => onItemClick(item)} >
                <h1><a href="#" >{item.title}</a></h1>
                <Story story={item}/>
              </section>
            )}
      	  </div>
          { items.length < totalRows && <button type="button" onClick={() => onFetchMoreItemsClick("stories")}>Fetch More</button> }
        </div>
        <div className='col-sm-9 col-sm-offset-3 col-md-10 col-md-offset-2 main'>
          <StoryDetails showingItem={ showingItem } createNewItemClick= { createNewItemClick } />
        </div>
      </div>
      
    ) 
  }
}

