import { EMAIL_CHANGE, USERNAME_CHANGE } from '../constants/actionTypes';

exports.emailChange = (email='') => ({
    type: EMAIL_CHANGE,
    email
});

exports.usernameChange = (username='') => ({
    type: USERNAME_CHANGE,
    username
});

