import { FETCH_GROUP_FULFILLED, FETCH_GROUP_REJECTED, FETCH_GROUPS_REJECTED, PURGE_GROUPS } from '../constants/actionTypes'
import axios from 'axios'


export function fetchGroups() {
  
  return function(dispatch, getState){
    axios.get('/groups?include_docs=true&bookmark=' + getState().groups.bookmark)
      .then((response) => {
        dispatch({ type: FETCH_GROUPS_FULFILLED, payload: response.data })
      })
      .catch((err) => {
        dispatch({ type: FETCH_GROUPS_REJECTED, payload: err })
      })
  }
}

export function purgeGroups() {
  
  return ({
    type: PURGE_GROUPS
  });
}