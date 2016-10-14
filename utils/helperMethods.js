
import { each, omit, find } from 'lodash'
import axios from 'axios'
// import { updateAuthToken } from '../actions/currentUserActions'



export function findUserById(id, users){
  return find(users, { _id: id });
};

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


