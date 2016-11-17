// pages/listContainer.js

import React, { propType } from 'react'
import { connect } from 'react-redux'

import Users from '../components/Users'
import Stories from '../components/Stories'
import Groups from '../components/Groups'
import { showingItemChange } from '../actions/uiActions'
import { fetchUsers, purgeUsers } from '../actions/userActions'
import { fetchStories, purgeStories } from '../actions/storyActions'
import { fetchGroups, purgeGroups } from '../actions/groupActions'
import { showModal } from '../actions/uiActions'
import { CREATE_STORY, CREATE_GROUP } from '../constants/modalTypes'

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
    },
    fetchMoreItems: (listType) => {
      switch(listType){
        case "users": dispatch(fetchUsers()); break;
        case "stories": dispatch(fetchStories()); break
        case "groups": dispatch(fetchGroups()); break
      }
    },
    createNewItemClick: (itemType) => {
      switch(itemType){
        case "story": dispatch(showModal({ modal: { modalType: CREATE_STORY, modalProps: {}}})); break
        case "group": dispatch(showModal({ modal: { modalType: CREATE_GROUP, modalProps: {}}})); break
      }
    }
  }
}

const mapStateToProps = (store) => {
  return{
    groups: store.groups.groups,
    stories: store.stories.stories,
    users: store.users.users,
    showingItemId: store.ui.showingItemId,
    totalUsers: store.users.totalRows,
    totalStories: store.stories.totalRows,
    totalGroups: store.groups.totalRows
  }
}

@connect(mapStateToProps, mapDispatchToProps)

export default class UsersListContainer extends React.Component {
  
  componentWillMount(){
    this.props.fetchItems(this.props.listType)
  }
 
  constructor(){
    super();
  }
  
  render(){
  
    const { createNewItemClick, users, stories, groups, showingItemId, 
            onItemClick, listType, fetchMoreItems, 
            totalUsers, totalStories, totalGroups} = this.props;

    switch(listType){
      case "users": return(<Users items={users} showingItemId={showingItemId} onItemClick={onItemClick} totalRows={totalUsers} onFetchMoreItemsClick={fetchMoreItems}/>); break;
      case "groups": return(<Groups items={groups} showingItemId={showingItemId} onItemClick={onItemClick} totalRows={totalGroups} onFetchMoreItemsClick={fetchMoreItems}/>); break;
      case "stories": return(<Stories createNewItemClick={createNewItemClick} items={stories} showingItemId={showingItemId} onItemClick={onItemClick} totalRows={totalStories} onFetchMoreItemsClick={fetchMoreItems}/>); break;      
    }
  }
}
