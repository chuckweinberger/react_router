import { SHOWING_USER_CHANGE } from '../constants/actionTypes';

exports.showingUserChange = (showingUserId=null) => {
  return ({
    type: SHOWING_USER_CHANGE,
    showingUserId
  });
}