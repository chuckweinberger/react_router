import { ADD_USER } from '../constants/actionTypes'

export default function users(state={ users:[] }, action) {
    switch (action.type) {
        case ADD_USER:
          return {
              ...state,
              users: [...state.users, {_id: Math.random(), ...action.user}]
          };
          break;
        default:
        return state;
    }
};