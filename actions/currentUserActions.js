import * as actions from '../constants/actionTypes'
import axios from 'axios'
import { authTokenAccepted } from '../utils/helperMethods'

exports.emailChange = (email='') => ({
    type: actions.EMAIL_CHANGE,
    email
});

exports.usernameChange = (username='') => ({
    type: actions.USERNAME_CHANGE,
    username
});

export const login = data => dispatch => {
  
  dispatch({ type: actions.CURRENT_USER_LOGGING_IN })
  dispatch({ type: actions.FETCHING })
  axios.post('/logins', {
    user: data.username,
    password: data.password
  })
    .then((response) => {
      localStorage.setItem('currentUser', JSON.stringify(response.data))
      dispatch({ type: actions.CURRENT_USER_LOGGED_IN, payload: response.data })
    }) 
    .catch((err) => {
      dispatch({ type: actions.CURRENT_USER_LOGIN_FAILURE, payload: err })
      dispatch({ type: actions.END_FETCHING })
    })
}

export const logout = (data) => dispatch => {
  
  dispatch({ type: actions.CURRENT_USER_LOGGING_OUT })
  dispatch({ type: actions.FETCHING })
  axios.delete('/logins/' + data.currentUser._id )
    .then(() => {
      dispatch({ type: actions.CURRENT_USER_LOGGED_OUT })
      localStorage.removeItem('currentUser')
    }) 
    .catch((err) => {
      dispatch({ type: actions.CURRENT_USER_LOGOUT_FAILURE, payload: err })
      dispatch({ type: actions.END_FETCHING })
    })  
}

export const restore = dispatch => {
  const localStorageUser = JSON.parse(localStorage.getItem('currentUser'));
  const token = localStorageUser && 
                localStorageUser.auth && 
                localStorageUser.auth.accessToken && 
                localStorageUser.auth.accessToken.token;
  
  if (token && authTokenAccepted(token)){
    dispatch({ type: actions.CURRENT_USER_RESTORE_FROM_LOCAL_STORAGE, payload: localStorageUser })
  }
  
}
