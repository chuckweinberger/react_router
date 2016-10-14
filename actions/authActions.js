import * as actions from '../constants/actionTypes'
import axios from 'axios'

let authInterceptor,
    tokenExpirationWatch;
    
    
//add a header into all http requests that contains the authToken.
//also sets a timer so that the auth token is updated as it gets close to expiration
function insertAuthHeader(token){
  
  //add authentication header to axios default headers
  if(typeof(token) !== 'undefined'){
    authInterceptor = axios.interceptors.request.use(function(config) {
      config.headers.common['Authorization'] = "Bearer " + token ;
      return config 
    })
  }
  return;
}

function removeAuthHeader(){
  //add authentication header to axios default headers
  axios.interceptors.request.eject(authInterceptor)
  clearTokenExpirationWatch();
}

//once the timer in this function is set, this function will automatically
//update the currentUser's accessToken once it gets close to expiring
function setTokenExpirationWatch(accessToken, dispatch){
  
  const token = accessToken && accessToken.token;
  const tokenExpiration = accessToken && accessToken.expires;
  let renewIn = tokenExpiration ? tokenExpiration - 86400000 : null;
  renewIn = 5000;
  if (renewIn)
    tokenExpirationWatch = setTimeout(() => {
      updateAccessToken(token, dispatch)
    }, renewIn) 
}

//function to remove watcher on the accessToken expiration date
function clearTokenExpirationWatch(){
  clearTimeout(tokenExpirationWatch)
}

export const deleteAccessToken = (dispatch)  => {
  removeAuthHeader();
  localStorage.removeItem('accessToken');
  clearTokenExpirationWatch();
  dispatch({ type: actions.DELETE_ACCESS_TOKEN, payload: {} });
}

export const setAccessToken = (accessToken, dispatch) => {
  insertAuthHeader(accessToken.token);
  localStorage.setItem('accessToken', JSON.stringify(accessToken));
  setTokenExpirationWatch(accessToken, dispatch);
}

//updates currentUser's authToken with the server.
export const updateAccessToken = (token, dispatch) => {
  
  return new Promise(function(resolve, reject){
 
    if( typeof(token) !== 'undefined' ){
      dispatch({ type: actions.ACCESS_TOKEN_UPDATE_PENDING, payload: {} })
      axios({
        method: 'put',
        url: '/logins/' + token,
        headers: { 'Authorization': 'Bearer ' + token }
      })
      .then((response) => {
        const accessToken = response.data;
        localStorage.setItem('accessToken', JSON.stringify(accessToken));
        console.log("Access token was updated");
        setAccessToken(accessToken, dispatch);
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
