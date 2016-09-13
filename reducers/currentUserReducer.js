import { EMAIL_CHANGE, USERNAME_CHANGE, SHOW_USER_DETAILS } from '../constants/actionTypes'
import { DEFAULT_USER } from '../constants/defaults'

export default function uiReducer(state={ userName:'', email: '', _id: '' }, action) {
  
  switch (action.type) {
      case EMAIL_CHANGE:
        return {
            ...state,
            email: action.email
        };
        break;
      case USERNAME_CHANGE:
        return {
            ...state,
            username: action.username
        };
        break;
        case SHOW_USER_DETAILS:
        return {
          ...state,
          _id: action._id
        };
        break;
      default:
        return state;
        break;
  }

}