import { EMAIL_CHANGE, USERNAME_CHANGE, CURRENT_USER_LOGGED_IN, CURRENT_USER_LOGGED_OUT, CURRENT_USER_LOGGING_IN, CURRENT_USER_LOGGING_OUT } from '../constants/actionTypes';

exports.emailChange = (email='') => ({
    type: EMAIL_CHANGE,
    email
});

exports.usernameChange = (username='') => ({
    type: USERNAME_CHANGE,
    username
});

export const login = data => dispatch => {
  
  dispatch({
    type: CURRENT_USER_LOGGING_IN
  })
  setTimeout(() => {
    dispatch({
      type: CURRENT_USER_LOGGED_IN,
      payload: data
    })
  }, 2000)
}

exports.logout = () => ({
  
  type: CURRENT_USER_LOGGED_OUT,
  payload: {}
  
})
// export const logout = () => dispatch => {
//   dispatch({
//     type: CURRENT_USER_LOGGED_OUT
//   })
//   setTimeout(() => {
//     dispatch({
//       type: CURRENT_USER_LOGGED_OUT
//     })
//   }, 2000)
// }