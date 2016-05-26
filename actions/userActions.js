import { ADD_USER } from '../constants/actionTypes'

exports.addUser = (user= {  username: '', 
                          email: '',
                          _id: null 
                        }) => ({
    type: ADD_USER,
    user
});
