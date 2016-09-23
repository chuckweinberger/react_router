import { FETCH_USERS_PENDING, FETCH_USERS_REJECTED, FETCH_USERS_FULFILLED, SHOWING_ITEM_CHANGE } from '../constants/actionTypes'

const initialState = {
  fetchingUsers: false,
  fetchedUsers: false,
  fetchUsersError: null,
  showingUserId: null
}

export default function uiReducer(state = initialState, action) {
  
  switch (action.type) {
    case FETCH_USERS_PENDING: {
      return { ...state, fetchingUsers: true}
      break;
    }
    case FETCH_USERS_REJECTED: {
      return { ...state, fetchUserError: action.payload, fetchingUser: false}
      break;
    }
    case FETCH_USERS_FULFILLED: {
      return{
        fetchingUsers: false,
        fetchedUsers: true,
        fetchUserError: null
      }
      break;
    }
      case SHOWING_ITEM_CHANGE:
      return {
        ...state,
        showingItemId: action.showingItemId
      };
      break;
    default:
      return state;
  }

};