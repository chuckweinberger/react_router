import { ADD_USER, ADD_USERS, FETCH_USERS_FULFILLED, FETCH_USERS_REJECTED, PURGE_USERS } from '../constants/actionTypes'
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
    axios.get(`/users?include_docs=true&bookmark=${getState().users.bookmark}`)
      .then((response) => {
        dispatch({ type: FETCH_USERS_FULFILLED, payload: response.data })
      })
      .catch((err) => {
        dispatch({ type: FETCH_USERS_REJECTED, payload: err })
      })
  }
}


export function purgeUsers() {
  
  return ({
    type: PURGE_USERS
  });
}
