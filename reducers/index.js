import { combineReducers } from 'redux'
import usersReducer from './usersReducer'
import uiReducer from './uiReducer'

export default combineReducers({
  usersReducer,
  uiReducer,
  authReducer
})