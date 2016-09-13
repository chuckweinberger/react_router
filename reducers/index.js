import { combineReducers } from 'redux'
import usersReducer from './usersReducer'
import currentUserReducer from './currentUserReducer'
import authReducer from './authReducer'
import uiReducer from './uiReducer'

export default combineReducers({
  usersReducer,
  currentUserReducer,
  authReducer,
  uiReducer
})