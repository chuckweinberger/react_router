
import { applyMiddleware, createStore } from "redux"

//import { ADD_USERS } from './constants/actionTypes'
import * as user from './actions/userActions'
import axios from "axios"
import logger from "redux-logger"
import promise from "redux-promise-middleware"
import reducer from "./reducers"
import thunk from "redux-thunk"


// //populate users
// const users = [ { username: "Chuck", email: "cweinberger@gmail.com" },
//               { username: "Aron", email: "aron@gmail.com" },
//               { username: "Bob", email: "bob@gmail.com" }
//             ]
//
// const users2 =[ { username: "Jan", email: "jan@gmail.com" },
//               { username: "Jill", email: "Jill@gmail.com" },
//               { username: "Joan", email: "joan@gmail.com" }
            // ]
const middleware = applyMiddleware(promise(), thunk, logger())
const store = createStore(reducer, middleware)

// store.dispatch((dispatch) => {
//
//   dispatch(user.addUsers(users));
//   dispatch(user.addUsers(users2));
//
// })

// dispatch(user.fetchUsers(dispatch))


export default store
