// pages/UserListContainer.js

import React, { propType } from 'react'
import { connect } from 'react-redux'

import Users from '../components/Users'
import { showUserDetails } from '../creators/userCreators'


  const mapStateToProps = ({ users, _id }) => {
    return{
      users: users,
      showUser: _id
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

  