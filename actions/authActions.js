import * as actions from '../constants/actionTypes'
import axios from 'axios'
//import {logout} from './currentUserActions'

let authInterceptor,
    responseInterceptor,
    tokenExpirationWatch;
    
//function that is called whenever we set the auth token so to look at all HTTP responses to see if the
//currentUser has been logged-out by the server    
function insertResponseHeader(currentUser, dispatch) {
  responseInterceptor = axios.interceptors.response.use(
    function(response){
      return response;
    }, 
    function(error){
      if(error.response.status === 401) {
        dispatch({ type: actions.CURRENT_USER_LOGOUT, payload: {currentUser: currentUser } });
        return Promies.reject(error)
      }
    }
  )
}    
    
//add a header into all http requests that contains the authToken.
//also sets a timer so that the auth token is updated as it gets close to expiration
function insertAuthHeader(currentUser, dispatch){
  
  const token = currentUser && currentUser.auth && currentUser.auth.accessToken && currentUser.auth.accessToken.token;
  
  //add authentication header to axios default headers
  if(typeof(token) !== 'undefined'){
    insertResponseHeader(currentUser, dispatch);//response interceptor that looks to see if the currentUser has been logged-out by the server
    authInterceptor = axios.interceptors.request.use(function(config) {
      config.headers.common['Authorization'] = "Bearer " + token ;
      return config 
    })
  }
  return;
}

function removeAuthHeader(){
  //remove authentication header to axios default headers
  axios.interceptors.request.eject(authInterceptor);
  //remoe the response interceptor that looks to see if the currentUser is no longer authorized
  axios.interceptors.request.eject(responseInterceptor);
  //also remove the token watch
  clearTokenExpirationWatch();
}

//once the timer in this function is set, this function will automatically
//update the currentUser's accessToken once it gets close to expiring
function setTokenExpirationWatch(currentUser, dispatch){
  
  const tokenExpiration = currentUser && currentUser.auth && currentUser.auth.accessToken && currentUser.auth.accessToken.expires;
  let renewIn = tokenExpiration ? tokenExpiration - 86400000 : null;
  if (renewIn)
    tokenExpirationWatch = setTimeout(() => {
      updateAccessToken(currentUser, dispatch)
    }, renewIn) 
}

//function to remove watcher on the accessToken expiration date
function clearTokenExpirationWatch(){
  clearTimeout(tokenExpirationWatch)
}

export const deleteAccessToken = (dispatch)  => {
  removeAuthHeader();
  clearTokenExpirationWatch();
  dispatch({ type: actions.DELETE_ACCESS_TOKEN, payload: {} });
}

export const setAccessToken = (currentUser, dispatch) => {
  insertAuthHeader(currentUser, dispatch);
  setTokenExpirationWatch(currentUser, dispatch);
}

//updates currentUser's authToken with the server.
export const updateAccessToken = (data, dispatch) => {
  
  return new Promise(function(resolve, reject){
    
    const accessToken = data && data.auth && data.auth.accessToken;
    const token =  accessToken && accessToken.token;
 
    if( typeof(token) !== 'undefined' ){
      dispatch({ type: actions.ACCESS_TOKEN_UPDATE_PENDING, payload: {} })
      axios({
        method: 'put',
        url: '/logins/' + token,
        headers: { 'Authorization': 'Bearer ' + token }
      })
      .then((response) => {
        const accessToken = response.data;
        let currentUser = JSON.parse(localStorage.getItem('currentUser'));
        currentUser.auth.accessToken = accessToken;
        console.log("Access token was updated");
        setAccessToken(currentUser, dispatch);
        dispatch({ type: actions.ACCESS_TOKEN_UPDATE_FULFILLED, payload: {accessToken} })
        resolve(accessToken)
      })
      .catch((error) => {
        console.log("Couldn't udpate the currentUser's authToken because " + error);
        dispatch({ type: actions.ACCESS_TOKEN_UPDATE_REJECTED, payload: {} })
        reject("Token no longer accepted by the server");
      })
    } else {
      reject("No token found in localStorage");
    }
  })
}
