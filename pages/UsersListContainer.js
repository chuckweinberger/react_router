// pages/UserListContainer.js

import React, { propType } from 'react'
import { connect } from 'react-redux'

import Users from '../components/Users'
import { showingUserChange } from '../actions/uiActions'
import { fetchUsers } from '../actions/userActions'


const mapDispatchToProps = (dispatch) => {
  return{
    onUserClick: (_id) => {
      dispatch(showingUserChange(_id));
    },
    fetchUsers: () => { dispatch(fetchUsers())}
  }
}

const mapStateToProps = (store) => {
  return{
    users: store.users.users,
    showingUserId: store.ui.showingUserId
  }
}

@connect(mapStateToProps, mapDispatchToProps)

export default class UsersListContainer extends React.Component {
  
  componentWillMount(){
    this.props.fetchUsers()
  }
      
  render(){
    const { users, showingUserId, onUserClick } = this.props;

    return(
      <Users users={users} showingUserId={showingUserId} onUserClick={onUserClick}>
      </Users>
    )
  }
}
