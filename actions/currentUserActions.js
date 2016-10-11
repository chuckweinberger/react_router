//Note, asynch actions use redux-promise-middleware to automatically dispatch [action-name]_pending/fulfilled/rejected actions across the life of the asynch activity. 

import * as actions from '../constants/actionTypes'
import axios from 'axios'
import { checkValidityOfToken, insertAuthToken, removeAuthToken, updateAuthToken } from '../utils/helperMethods'

export const login = data => dispatch => {

//although I want to use redux-promise-middleware for this asynch action, I can't because it auto dispatches the CURRENT_USER_LOGIN_FULLFILLED prior to my inserting the auth token from that newly logged-in user.  I need to insert the auth-token header prior to mounting any component that needs the auth token to fetch data needed by that component.
  
  axios.post('/logins', { user: data.username, password: data.password }
            ).then((response) => {
                    localStorage.setItem('currentUser', JSON.stringify(response.data));
                    insertAuthToken(response.data);
                    dispatch({ type: actions.CURRENT_USER_LOGIN_FULFILLED, payload: response.data })
            }) 
            .catch((err) => {
               dispatch({ type: actions.CURRENT_USER_LOGIN_FAILURE, payload: err });
            })
}

//although I want to use redux-promise-middleware for this asynch action, I can't because it auto dispatches the CURRENT_USER_LOGOUT_FULLFILLED prior to my removing the auth token for the logged-out user.  This could cause components that required logged-in users to show there data after the user logs-out.
export const logout = (data) => dispatch => {
  
  dispatch({ type: actions.CURRENT_USER_LOGOUT_PENDING })
  dispatch({ type: actions.FETCHING })
  axios.delete('/logins/' + data.currentUser._id )
    .then(() => {
      localStorage.removeItem('currentUser');
      removeAuthToken();
      dispatch({ type: actions.CURRENT_USER_LOGOUT_FULFILLED })
    }) 
    .catch((err) => {
      dispatch({ type: actions.CURRENT_USER_LOGOUT_REJECTED, payload: err })
      dispatch({ type: actions.END_FETCHING })
    })  
}

//get currentUser data stored in local storage and then test the currentUser's auth token for validity
//If still valid, update the auth token and log-in the currentUser with the new auth token
export const restoreCurrentUser = dispatch => {
  
    const localStorageUser = JSON.parse(localStorage.getItem('currentUser'));
    const token = localStorageUser && 
                  localStorageUser.auth && 
                  localStorageUser.auth.accessToken && 
                  localStorageUser.auth.accessToken.token;
                  

    if (token){
      checkValidityOfToken(token)
      .then((response) => {
        insertAuthToken(localStorageUser);
        updateAuthToken(localStorageUser)
         .then((response) => {
            localStorageUser.auth.accessToken = response;
            localStorage.setItem("currentUser", JSON.stringify(localStorageUser));
            insertAuthToken(localStorageUser);
            dispatch({ type: actions.CURRENT_USER_LOGIN_FULFILLED, payload: localStorageUser });
          });  
      })
      .catch((error) => {
        localStorage.removeItem('currentUser');
        return false
      }) 

    } else return false
};
  
//finally, I get to use Redux-promise-middleware
export const createNewAccount = (data) => dispatch => {
  
  dispatch({
    type: actions.CREATE_ACCOUNT,
    payload: axios.post('/users', { user: data })
  }).then(({ value, action }) => {
    localStorage.setItem('currentUser', JSON.stringify(value.data));
    insertAuthToken(value.data);
  })

}
