import { FETCH_STORIES_FULFILLED, PURGE_STORIES } from '../constants/actionTypes'

const initialState = {
  stories: [],
  bookmark: "",
  totalRows: 0
}

export default function stories(state=initialState, action) {

  switch (action.type) {
    case FETCH_STORIES_FULFILLED: {
      const newStories = action.payload.rows.map(function(story){ return (story.doc) });
      state = { ...state, 
                stories:state.stories.concat(newStories), 
                bookmark: action.payload.bookmark, 
                totalRows: action.payload.total_rows 
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
