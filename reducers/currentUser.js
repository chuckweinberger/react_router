import { CURRENT_USER_LOGGED_IN, CURRENT_USER_LOGGED_OUT, EMAIL_CHANGE, USERNAME_CHANGE, SHOW_USER_DETAILS } from '../constants/actionTypes'

const initialState = {
  auth: {} ,
  currentUser: null
}
export default function uiReducer(state=initialState, action) {
  
  let modifiedUser = {}
  
  switch (action.type) {
  case CURRENT_USER_LOGGED_IN:
    return { ...state, auth: { loggedIn: true }, currentUser: action.payload }
    break;
  case CURRENT_USER_LOGGED_OUT:
    return initialState
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