import { SHOWING_USER_CHANGE } from '../constants/actionTypes'

export default function uiReducer(state={ showingUserId: null }, action) {
  
  switch (action.type) {
      case SHOWING_USER_CHANGE:
      return {
        ...state,
        showingUserId: action.showingUserId
      };
      break;
    default:
      return state;
  }

};