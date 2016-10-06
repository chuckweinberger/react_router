
import { each, omit, find } from 'lodash'
import axios from 'axios'

let authInterceptor;

export function findUserById(id, users){
  return find(users, { _id: id });
};

export function createConstants(...constants) {
    return constants.reduce((acc, constant) => {
        acc[constant] = constant;
        return acc;
    }, {});
}

export function authTokenAccepted(token){
  console.log("now in checkauthtoken function");
  
  //to-do: check validity of the access token
  axios.get('', {
    params: { access_token: token}
  })
  .then(response => {
    console.log("Access token was checked against server and found to still be valid");
    return true
  })
  .catch(error => {
    console.log("Access token was checked against server and found to be invalid");
    return false
  })
  
}

export function insertAuthToken(currentUser){
  //add authentication header to axios default headers
  authInterceptor = axios.interceptors.request.use(function(config) {
    config.headers.common['Authorization'] = "Bearer " + currentUser.auth.accessToken.token ;
    return config 
  })
  return;
}

export function removeAuthToken(){
  //add authentication header to axios default headers
  axios.interceptors.request.eject(authInterceptor)
}