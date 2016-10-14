import * as actions  from '../constants/actionTypes'
import { cloneDeep } from 'lodash'

const initialState = {
  currentUser: null,
  isLoading:false,
  error: null
}
export default function currentUser(state=initialState, action) {
  
  switch (action.type) {
  case actions.CURRENT_USER_RESTORE_FROM_LOCAL_STORAGE:
    action.payload.loggedIn = true;
    return { ...state, currentUser: action.payload, isLoading: false }
    break;
  case actions.CURRENT_USER_LOGIN_PENDING:
    return { ...state, isLoading: true }
    break;
  case actions.CURRENT_USER_LOGIN_FULFILLED:
    action.payload.loggedIn = true;
    return { ...state, currentUser: action.payload, isLoading: false, error: null }
    break;
  case actions.CURRENT_USER_LOGIN_REJECTED:
    return { ...state, isLoading: false, error: action.payload }
    break;
  case actions.CURRENT_USER_LOGOUT_PENDING:
    return { ...state, isLoading: true }
    break;
  case actions.CURRENT_USER_LOGOUT_FULFILLED:
    return initialState
    break;
  case actions.CURRENT_USER_LOGOUT_REJECTED:
    return { ...state, isLoading: false, error: action.payload }
    break;
  case actions.CREATE_ACCOUNT_PENDING:
    return { ...state, isLoading: true }
    break;
  case actions.CREATE_ACCOUNT_FULFILLED:
    action.payload.loggedIn = true;
    return { ...state, currentUser: action.payload, isLoading: false, error: null }
    break;
  case actions.CREATE_ACCOUNT_REJECTED:
    return { ...state, isLoading: false, error: action.payload }
    break;

  default:
    return state;
    break;
  }

}