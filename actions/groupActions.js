import { END_FETCHING, FETCHING, FETCH_GROUP_FULFILLED, FETCH_GROUP_REJECTED, FETCH_GROUPS_REJECTED, PURGE_GROUPS } from '../constants/actionTypes'
import axios from 'axios'


export function fetchGroups() {
  
  return function(dispatch, getState){
    dispatch({ type: FETCHING })
    axios.get('/groups?include_docs=true&bookmark=' + getState().groups.bookmark)
      .then((response) => {
        dispatch({ type: FETCH_GROUPS_FULFILLED, payload: response.data })
        dispatch({ type: END_FETCHING })
      })
      .catch((err) => {
        dispatch({ type: FETCH_GROUPS_REJECTED, payload: err })
        dispatch({ type: END_FETCHING })
      })
  }
}

export function purgeGroups() {
  
  return ({
    type: PURGE_GROUPS
  });
}