import {ADD_USER, EMAIL_CHANGE, USERNAME_CHANGE} from './constants/storeConstants';

const usersReducer = (state={ users:[], userName:'', email: '' }, action) => {
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
        default:
        return state;
    }
};

module.exports = {usersReducer};