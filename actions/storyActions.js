import { FETCH_STORIES_FULFILLED, FETCH_STORIES_REJECTED, PURGE_STORIES } from '../constants/actionTypes'
import axios from 'axios'


export function fetchStories() {
  
  return function(dispatch){
    axios.get('/stories?include_docs=true')
      .then((response) => {
        dispatch({ type: FETCH_STORIES_FULFILLED, payload: response.data })
      })
      .catch((err) => {
        dispatch({ type: FETCH_STORIES_REJECTED, payload: err })
      })
  }
}

export function purgeStories() {
  
  return ({
    type: PURGE_STORIES
  });
}