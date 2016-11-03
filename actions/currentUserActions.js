//Note, asynch actions use redux-promise-middleware to automatically dispatch [action-name]_pending/fulfilled/rejected actions across the life of the asynch activity. 

import * as actions from '../constants/actionTypes'
import axios from 'axios'
import { deleteAccessToken, setAccessToken, updateAccessToken } from './authActions'

export const login = data => dispatch => {

//although I want to use redux-promise-middleware for this asynch action, I can't because it auto dispatches the CURRENT_USER_LOGIN_FULLFILLED prior to my inserting the auth token from that newly logged-in user.  I need to insert the auth-token header prior to mounting any component that needs the auth token to fetch data needed by that component.

  dispatch({ type: actions.CURRENT_USER_LOGIN_PENDING, payload: {} });
  axios.post('/logins', { user: data.username, password: data.password }
            ).then((response) => {
                    setAccessToken(response.data, dispatch);
                    localStorage.setItem('currentUser', JSON.stringify(response.data));
                    dispatch({ type: actions.CURRENT_USER_LOGIN_FULFILLED, payload: response.data })
            }) 
            .catch((err) => {
               dispatch({ type: actions.CURRENT_USER_LOGIN_REJECTED, payload: err });
            })
}

//although I want to use redux-promise-middleware for this asynch action, I can't because it auto dispatches the CURRENT_USER_LOGOUT_FULLFILLED prior to my removing the auth token for the logged-out user.  This could cause components that required logged-in users to show there data after the user logs-out.
export const logout = (data) => dispatch => {
  
  dispatch({ type: actions.CURRENT_USER_LOGOUT_PENDING })
  dispatch({ type: actions.FETCHING })
  axios.delete('/logins/' + data.currentUser._id )
    .then(() => {
      localStorage.removeItem('currentUser');
      deleteAccessToken(dispatch);
      dispatch({ type: actions.CURRENT_USER_LOGOUT_FULFILLED });
      dispatch({ type: actions.END_FETCHING });
    }) 
    .catch((err) => {
      dispatch({ type: actions.CURRENT_USER_LOGOUT_REJECTED, payload: err });
      dispatch({ type: actions.END_FETCHING });
    })  
}

//get currentUser data stored in local storage and then test the currentUser's auth token for validity and set the HTTP header
export const restoreCurrentUser = dispatch => {
  
    const localStorageUser = JSON.parse(localStorage.getItem('currentUser'));
    const accessToken = localStorageUser && localStorageUser.auth && localStorageUser.auth.accessToken; 
                  
    if (accessToken){
      updateAccessToken(localStorageUser, dispatch)//updates token and sets the http header.  also sets a timer to trigger future updateAccessTokens 
      .then((response) => {
        dispatch({ type: actions.CURRENT_USER_LOGIN_FULFILLED, payload: localStorageUser });
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
  }).then(({ response, action }) => {
    localStorage.setItem('currentUser', JSON.stringify(response.data));
    setAccessToken(response.data, dispatch);
  })

}

// export const update = ({ data, persist }) => dispatch => {
//
//   if (persist) {
//     dispatch({  key: action.CURRENT_USER_UPDATE,
//                 payload: axios.post()
//             })
//             .then(({ value, action }) => {
//
//               localStorage.setItem('currentUser', JSON.stringify(value.data));
//
//             })
//   } else {
//     dispatch({  key: action.CURRENT_USER_UPDATE_FULFILLED,
//                 payload: data
//             })
//   }
//
// }


      
  

