import { FETCH_STORIES_FULFILLED, PURGE_STORIES, FETCH_STORIES_REJECTED, FETCH_STORIES_PENDING } from '../constants/actionTypes'

const initialState = {
  stories: [],
  bookmark: "",
  totalRows: 0,
  fetching: false,
  fetched: false,
  errors: null
}

export default function stories(state=initialState, action) {

  switch (action.type) {
    case FETCH_STORIES_PENDING: {
      state = { ...state, 
                fetching: true,
                fetched: false
              }
      break;
    }
    case FETCH_STORIES_FULFILLED: {
      const newStories = action.payload.rows.map(function(story){ return (story.doc) });
      state = { ...state, 
                stories:state.stories.concat(newStories), 
                bookmark: action.payload.bookmark, 
                totalRows: action.payload.total_rows ,
                fetching: false,
                fetched: true
              }
      break;
    }
    case FETCH_STORIES_REJECTED: {
      state = { ...state, 
                fetching: false,
                fetched: false,
                errors: action.payload
              }
      break;
    }
    case PURGE_STORIES: {
      state = initialState;
      break;
    }
  }
  return state;
};
