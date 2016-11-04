import * as actions  from '../constants/actionTypes'

const initialState = {
  accessToken: null,
  fetching: false,
  error: null
}
export default function auth(state=initialState, action) {
  
  switch (action.type) {
  case actions.ACCESS_TOKEN_UPDATE_FULFILLED:
    return { ...state, accessToken: action.payload.accessToken, fetching: false, error: null}
    return initialState 
    break;
  case actions.ACCESS_TOKEN_UPDATE_PENDING:
    return { ...state, fetching: true } 
    break;
  case actions.ACCESS_TOKEN_UPDATE_REJECTED:
    return { ...state, error: action.payload, fetching:false}
    break;
  case actions.DELETE_ACCESS_TOKEN:
    return initialState 
    break;
  default:
    return state;
    break;
  }
  
  return state

}