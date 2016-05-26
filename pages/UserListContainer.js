// pages/UserListContainer.js

import React, { propType } from 'react'
import { connect } from 'react-redux'

import Users from '../components/Users'
import { showUserDetails } from '../actions/uiActions'


  const mapStateToProps = ( { usersReducer, uiReducer }) => {
    return{
      users: usersReducer.users,
      showUser: uiReducer._id
    }
  }

  const mapDispatchToProps = (dispatch) => {
    return{
      onUserClick: (_id) => {
        dispatch(showUserDetails(_id))
      }
    }
  }


  
  const UserListContainer = connect(
    mapStateToProps,
    mapDispatchToProps
  )(Users)
  
  export default UserListContainer

  