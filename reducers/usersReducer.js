import {ADD_USER, EMAIL_CHANGE, USERNAME_CHANGE, SHOW_USER_DETAILS} from '../constants/actionTypes';

const usersReducer = (state={ users:[], userName:'', email: '', _id: '' }, action) => {
    switch (action.type) {
        case ADD_USER:
        return {
            ...state,
            users: [...state.users, {_id: Math.random(), ...action.user}]
        };
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
};

module.exports = usersReducer;