import { END_FETCHING, FETCHING, FETCH_STORIES_FULFILLED, FETCH_STORIES_REJECTED, PURGE_STORIES } from '../constants/actionTypes'
import axios from 'axios'


export function fetchStories() {
  
  return function(dispatch, getState){
    dispatch({ type: FETCHING })
    axios.get('/stories?include_docs=true&bookmark=' + getState().stories.bookmark)
      .then((response) => {
        dispatch({ type: FETCH_STORIES_FULFILLED, payload: response.data })
        dispatch({ type: END_FETCHING })
      })
      .catch((err) => {
        dispatch({ type: FETCH_STORIES_REJECTED, payload: err })
        dispatch({ type: END_FETCHING })
      })
  }
}

export function purgeStories() {
  
  return ({
    type: PURGE_STORIES
  });
}