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
      users: store.users.users,
      showingUserId: store.ui.showingUserId
    }
  }

  
  const userListContainer = connect(
    mapStateToProps,
    mapDispatchToProps
  )(Users)

  export default userListContainer

  //   @connect(mapStateToProps, mapDispatchToProps)
  //
  //   export default class userListContainer extends React.Component {
  //
  //     render(){
  //       const { users, showingUserId, onUserClick } = this.props;
  //
  //       return(
  //         <Users users={users} showingUserId={showingUserId} onUserClick={onUserClick}>
  //         </Users>
  //       )
  //     }
  //
  //   }   