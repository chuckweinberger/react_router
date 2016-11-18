import * as actions from '../constants/actionTypes'
import axios from 'axios'
import { SubmissionError } from 'redux-form'


export function fetchStories() {
  
  return function(dispatch, getState){
    dispatch({ type: actions.FETCHING })
    axios.get('/stories?include_docs=true&sort="-created"&bookmark=' + getState().stories.bookmark)
      .then((response) => {
        dispatch({ type: actions.FETCH_STORIES_FULFILLED, payload: response.data })
        dispatch({ type: actions.END_FETCHING })
      })
      .catch((err) => {
        dispatch({ type: actions.FETCH_STORIES_REJECTED, payload: err })
        dispatch({ type: actions.END_FETCHING })
      })
  }
}

export function purgeStories() {
  
  return ({
    type: actions.PURGE_STORIES
  });
}

export const getStoryById = (id) => dispatch => {
  dispatch({ type: actions.FETCHING });
  dispatch({ type: actions.GET_STORY_BY_ID,
             payload:   axios.get('/stories/' + id)
          })
          .then((response) => {
            dispatch({  type: actions.SHOWING_ITEM_CHANGE,
                        payload: response.value.data._id
                    })
          })
}

export const createStory = (data) => dispatch => {
  
  //determine of we need to submit this new story/event to the story or the event URL path
  const path = (data.type === 'event') ? 'events' : 'stories'; 
  
  dispatch({ type: actions.FETCHING });

  return dispatch({ type: actions.CREATE_STORY,
             payload: axios.post(path, data)})
    .then((response) => {
      dispatch({ type: actions.END_FETCHING })
    })
    .catch(({response}) => {
      dispatch({ type: actions.END_FETCHING })
      let errors = response.data.errors;
      //create an object that contains keys of all of the form fields where there are errors
      //along with the associated error messages
      let errorWrapper = {};
      for (var i=0; i<errors.length; i++){
        const error = response.data.errors[i];
        const errorField = error.path.split('/')[1];
        console.log(errorField, error.message);
        errorWrapper[errorField]  = error.message;
      }
      //add to the error object a general form submission failure.  
      errorWrapper._error = "Story creation failed";
      throw new SubmissionError(errorWrapper);
    })
  }
