// pages/listContainer.js

import React, { propType } from 'react'
import { connect } from 'react-redux'

import Users from '../components/Users'
import Stories from '../components/Stories'
import { showingItemChange } from '../actions/uiActions'
import { fetchUsers, purgeUsers } from '../actions/userActions'
import { fetchStories, purgeStories } from '../actions/storyActions'

const mapDispatchToProps = (dispatch) => {
  return{
    onItemClick: (_id) => {
      dispatch(showingItemChange(_id));
    },
    //methods to fetch a specific type of item into a clean array for that item
    fetchItems: (listType) => { 
      switch(listType){
        case "users": dispatch(purgeUsers()); dispatch(fetchUsers()); break;
        case "stories": dispatch(purgeStories()); dispatch(fetchStories()); break
        case "groups": dispatch(purgeGroups()); dispatch(fetchGroups()); break
      }
    }
  }
}

const mapStateToProps = (store) => {
  return{
    // groups: store.groups.groups,
    stories: store.stories.stories,
    users: store.users.users,
    showingItemId: store.ui.showingItemId
  }
}

@connect(mapStateToProps, mapDispatchToProps)

export default class UsersListContainer extends React.Component {
  
  componentWillMount(){
    this.props.fetchItems(this.props.listType)
  }
 
  render(){
  
    const { users, stories, groups, showingItemId, onItemClick, listType} = this.props;

    switch(listType){
      case "users": return(<Users items={users} showingItemId={showingItemId} onItemClick={onItemClick}/>); break;
      case "groups": return(<Groups items={groups} showingItemId={showingItemId} onItemClick={onItemClick}/>); break;
      case "stories": return(<Stories items={stories} showingItemId={showingItemId} onItemClick={onItemClick}/>); break;      
    }
  }
}
