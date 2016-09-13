
import { applyMiddleware, createStore } from "redux"

import { addUser } from './actions/userActions'
import logger from "redux-logger"
import promise from "redux-promise-middleware"
import reducer from "./reducers"
import thunk from "redux-thunk"


//populate users
let users = [ { username: "Chuck", email: "cweinberger@gmail.com" },
              { username: "Aron", email: "aron@gmail.com" },
              { username: "Bob", email: "bob@gmail.com" }
            ]

const middleware = applyMiddleware(promise(), thunk, logger())
const store = createStore(reducer, middleware)

users.map(user => store.dispatch(addUser(user) ));

export default store
