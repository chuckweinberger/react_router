import { combineReducers } from 'redux'
import stories from './stories'
import users from './users'

import currentUser from './currentUser'
import auth from './auth'
import ui from './ui'

export default combineReducers({
  users,
  stories,
  currentUser,
  auth,
  ui
})