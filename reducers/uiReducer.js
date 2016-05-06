import { EMAIL_CHANGE, USERNAME_CHANGE, SHOW_USER_DETAILS } from '../constants/actionTypes';

export default function usersReducer(state={ userName:'', email: '', _id: '' }, action) {
  
  switch (action.type) {
      case EMAIL_CHANGE:
      return {
          ...state,
          email: action.email
      };
      case USERNAME_CHANGE:
      return {
          ...state,
          username: action.username
      };
      case SHOW_USER_DETAILS:
      return {
        ...state,
        _id: action._id
      };
      default:
      return state;
  }

}