
import { applyMiddleware, createStore } from "redux"

//import { ADD_USERS } from './constants/actionTypes'
// import * as user from './actions/userActions'
// import axios from "axios"
import logger from "redux-logger"
import promise from "redux-promise-middleware"
import reducer from "./reducers"
import thunk from "redux-thunk"

const middleware = applyMiddleware(promise(), thunk, logger())
const store = createStore(reducer, middleware)

export default store
