import { combineReducers } from 'redux'
import users from './users'
import currentUser from './currentUser'
import auth from './auth'
import ui from './ui'

export default combineReducers({
  users,
  currentUser,
  auth,
  ui
})