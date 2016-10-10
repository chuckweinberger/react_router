import * as actions  from '../constants/actionTypes'

const initialState = {
  currentUser: null,
  isLoading:false
}
export default function uiReducer(state=initialState, action) {
  
  let modifiedUser = {}
  
  switch (action.type) {
  // case actions.CURRENT_USER_RESTORE_FROM_LOCAL_STORAGE:
  //   action.payload.loggedIn = true;
  //   return { ...state, currentUser: action.payload, isLoading: false }
  //   break;
  case actions.CURRENT_USER_LOGGED_IN:
    action.payload.loggedIn = true;
    return { ...state, currentUser: action.payload, isLoading: false }
    break;
  case actions.CURRENT_USER_LOGGED_OUT:
    return initialState
    break;
  case actions.CURRENT_USER_LOGGING_IN:
    return { ...state, isLoading: true }
    break;
  case actions.CURRENT_USER_LOGGING_OUT:
    return { ...state, isLoading: true }
    break;
  case actions.CURRENT_USER_LOGIN_FAILURE:
    return { ...state, isLoading: false }
    break;
  case actions.CURRENT_USER_LOGOUT_FAILURE:
    return { ...state, isLoading: false }
    break;
  case actions.CREATE_ACCOUNT_PENDING:
    return { ...state, isLoading: true }
    break;
  case actions.CREATE_ACCOUNT_REJECTED:
    return { ...state, isLoading: false }
    break;
  case actions.CREATE_ACCOUNT_FULFILLED:
    action.payload.loggedIn = true;
    return { ...state, currentUser: action.payload, isLoading: false, }
    break;
  case actions.EMAIL_CHANGE:
    modifiedUser = { ...state.currentUser, email: action.payload }
    return { ...state, modifiedUser };
    break;
  case actions.USERNAME_CHANGE:
    modifiedUser = { ...state.currenUser, username: action.payload }
    return { ...state, modifiedUser };
    break;
  default:
    return state;
    break;
  }

}