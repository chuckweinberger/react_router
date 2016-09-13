// pages/UserListContainer.js

import React, { propType } from 'react'
import { connect } from 'react-redux'

import Users from '../components/Users'
import { showingUserChange } from '../actions/uiActions'


  const mapDispatchToProps = (dispatch) => {
    return{
      onUserClick: (_id) => {
        dispatch(showingUserChange(_id));
      }
    }
  }

  const mapStateToProps = (store) => {
    return{
      users: store.usersReducer.users,
      showingUserId: store.uiReducer.showingUserId
    }
  }

  const userListContainer = connect(
    mapStateToProps,
    mapDispatchToProps
  )(Users)


  export default userListContainer
    