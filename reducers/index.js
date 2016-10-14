import { combineReducers } from 'redux'
import stories from './stories'
import users from './users'
import currentUser from './currentUser'
import auth from './auth'
import groups from './groups'
import ui from './ui'
import { routerReducer } from 'react-router-redux'

export default combineReducers({
  users,
  stories,
  currentUser,
  auth,
  ui,
  groups, 
  routing:routerReducer
})