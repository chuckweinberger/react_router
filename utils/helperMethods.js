
import { each, omit, find } from 'lodash'
import axios from 'axios'

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
  return true
  
}