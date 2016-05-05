import {ADD_USER, EMAIL_CHANGE, USERNAME_CHANGE, SHOW_USER_DETAILS} from '../constants/actionTypes';

exports.addUser = (user= {  username: '', 
                          email: '',
                          _id: null 
                        }) => ({
    type: ADD_USER,
    user
});

exports.emailChange = (email='') => ({
    type: EMAIL_CHANGE,
    email
});

exports.usernameChange = (username='') => ({
    type: USERNAME_CHANGE,
    username
});

exports.showUserDetails = (_id=null) => {
  console.log(`A user with an id of ${_id} was clicked.`)
  return ({
    type: SHOW_USER_DETAILS,
    _id
  });
}