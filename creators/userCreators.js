import {ADD_USER, EMAIL_CHANGE, USERNAME_CHANGE} from '../constants/storeConstants';

const addUser = (user= {  username: '', 
                          email: '',
                          _id: null 
                        }) => ({
    type: ADD_USER,
    user
});

const emailChange = (email='') => ({
    type: EMAIL_CHANGE,
    email
});

const usernameChange = (username='') => ({
    type: USERNAME_CHANGE,
    username
});