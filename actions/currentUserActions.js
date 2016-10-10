import * as actions from '../constants/actionTypes'
import axios from 'axios'
import { authTokenAccepted, insertAuthToken, removeAuthToken } from '../utils/helperMethods'

exports.emailChange = (email='') => ({
    type: actions.EMAIL_CHANGE,
    email
});

exports.usernameChange = (username='') => ({
    type: actions.USERNAME_CHANGE,
    username
});

export const login = data => dispatch => {
  
  dispatch({ type: actions.CURRENT_USER_LOGGING_IN });
  dispatch({ type: actions.FETCHING });
  axios.post('/logins', {
    user: data.username,
    password: data.password
  })
    .then((response) => {
      localStorage.setItem('currentUser', JSON.stringify(response.data));
      insertAuthToken(response.data);
      dispatch({ type: actions.CURRENT_USER_LOGGED_IN, payload: response.data });
    }) 
    .catch((err) => {
      dispatch({ type: actions.CURRENT_USER_LOGIN_FAILURE, payload: err });
      dispatch({ type: actions.END_FETCHING });
    })
}

export const logout = (data) => dispatch => {
  
  dispatch({ type: actions.CURRENT_USER_LOGGING_OUT })
  dispatch({ type: actions.FETCHING })
  axios.delete('/logins/' + data.currentUser._id )
    .then(() => {
      localStorage.removeItem('currentUser');
      removeAuthToken();
      dispatch({ type: actions.CURRENT_USER_LOGGED_OUT })
    }) 
    .catch((err) => {
      dispatch({ type: actions.CURRENT_USER_LOGOUT_FAILURE, payload: err })
      dispatch({ type: actions.END_FETCHING })
    })  
}

export const restoreCurrentUser = dispatch => {
  
    const localStorageUser = JSON.parse(localStorage.getItem('currentUser'));
    const token = localStorageUser && 
                  localStorageUser.auth && 
                  localStorageUser.auth.accessToken && 
                  localStorageUser.auth.accessToken.token;
                  
    if(token){
      insertAuthToken(localStorageUser)
      dispatch({ type: actions.CURRENT_USER_LOGGED_IN, payload: localStorageUser })
    } else return
};

  
export const createNewAccount = (data) => dispatch => {
  
  dispatch({
    type: actions.CREATE_ACCOUNT,
    payload: axios.post('/users', { user: data })
  }).then(({ value, action }) => {
    localStorage.setItem('currentUser', JSON.stringify(value.data));
    insertAuthToken(value.data);
  })

}
