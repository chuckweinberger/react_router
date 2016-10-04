import { CURRENT_USER_LOGGED_IN, CURRENT_USER_LOGGED_OUT, CURRENT_USER_LOGGING_IN, CURRENT_USER_LOGGING_OUT, EMAIL_CHANGE, USERNAME_CHANGE, SHOW_USER_DETAILS } from '../constants/actionTypes'

const initialState = {
  auth: {} ,
  currentUser: null,
  isLoading:false
}
export default function uiReducer(state=initialState, action) {
  
  let modifiedUser = {}
  
  switch (action.type) {
  case CURRENT_USER_LOGGED_IN:
    return { ...state, auth: { loggedIn: true }, currentUser: action.payload, isLoading: false }
    break;
  case CURRENT_USER_LOGGED_OUT:
    return initialState
    break;
  case CURRENT_USER_LOGGING_IN:
    return { ...state, isLoading: true }
    break;
  case CURRENT_USER_LOGGING_OUT:
    return { ...state, isLoading: true }
    break;
  case EMAIL_CHANGE:
    modifiedUser = { ...state.currentUser, email: action.payload }
    return { ...state, modifiedUser };
    break;
  case USERNAME_CHANGE:
    modifiedUser = { ...state.currenUser, username: action.payload }
    return { ...state, modifiedUser };
    break;
  default:
    return state;
    break;
  }

}