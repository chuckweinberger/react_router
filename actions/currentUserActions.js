import { EMAIL_CHANGE, USERNAME_CHANGE, CURRENT_USER_LOGGED_IN, CURRENT_USER_LOGGED_OUT } from '../constants/actionTypes';

exports.emailChange = (email='') => ({
    type: EMAIL_CHANGE,
    email
});

exports.usernameChange = (username='') => ({
    type: USERNAME_CHANGE,
    username
});

export function login(data) {
  //to-do: need to perform login api call and if accepted call the currentUser reducer to update the store
  return {
    type: CURRENT_USER_LOGGED_IN,
    payload: data
  }
}

export function logout() {
  return {
    type: CURRENT_USER_LOGGED_OUT
  }
}