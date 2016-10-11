
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

//confirms that a given authToken is still being accepted by the server
export function checkValidityOfToken(token){

  return new Promise(function(resolve, reject){
  
    if(typeof(token) === "undefined") reject("No Token Provided")

      axios.get('', {
        params: { access_token: token}
      })
      .then(response => {
        console.log("Access token was checked against server and found to still be valid");
        resolve(response)
      })
      .catch(error => {
        console.log("Access token was checked against server and found to be invalid");
        reject(error)
      })
  })
}

//takes an existing user and udpates his/her authToken with the server
export function updateAuthToken(currentUser){
  
  return new Promise(function(resolve, reject){
  
    const token = currentUser && currentUser.auth && currentUser.auth.accessToken && currentUser.auth.accessToken.token;
    
    if( !token ) reject("No Token Provided")
    
      axios.put('/logins/' + token)
      .then(response => {
        console.log("Access token was updated");
        resolve(response.data)
      })
      .catch(error => {
        console.log("Access token failed to update due to " + error);
        reject(error)
      })
  })
}

//add a header into all http requests that contains the authToken
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