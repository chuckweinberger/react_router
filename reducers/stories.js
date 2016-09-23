import { FETCH_STORIES_FULFILLED, PURGE_STORIES } from '../constants/actionTypes'

export default function stories(state={ stories:[] }, action) {

  switch (action.type) {
    case FETCH_STORIES_FULFILLED: {
      const newStories = action.payload.rows.map(function(story){ return (story.doc) });
      state = {...state, stories:state.stories.concat(newStories)}
      break;
    }
    case PURGE_STORIES: {
      state = { ...state, stories: [] };
      break;
    }
  }
  return state;
};
