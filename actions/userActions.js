import { ADD_USER, ADD_USERS, END_FETCHING, FETCHING, FETCH_USERS_FULFILLED, FETCH_USERS_REJECTED, PURGE_USERS } from '../constants/actionTypes'
import axios from 'axios'

exports.addUser = (user= {  username: '', 
                          email: '',
                          _id: null 
                        }) => ({
    type: ADD_USER,
    payload: user
});


exports.addUsers = (users = []) => ({ 
    type: ADD_USERS,
    payload: users
});

export function fetchUsers() {
  
  return function(dispatch, getState){
    dispatch({ type: FETCHING })
    axios.get(`/users?include_docs=true&bookmark=${getState().users.bookmark}`)
      .then((response) => {
        dispatch({ type: FETCH_USERS_FULFILLED, payload: response.data })
        dispatch({ type: END_FETCHING })
      })
      .catch((err) => {
        dispatch({ type: FETCH_USERS_REJECTED, payload: err })
        dispatch({ type: END_FETCHING })
      })
  }
}


export function purgeUsers() {
  
  return ({
    type: PURGE_USERS
  });
}
