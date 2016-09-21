import { ADD_USER, ADD_USERS, FETCH_USERS_FULFILLED } from '../constants/actionTypes'

export default function users(state={ users:[] }, action) {
  
  const generateId = function(){ return Math.random() };
  
  switch (action.type) {
    case ADD_USER: {
      state = { ...state, users: [...state.users, { id: generateId(), ...action.payload}]}
      break;
    }
    case ADD_USERS: {          
      const newUsers = action.payload.map(function(user){ return { id: generateId(), ...user }});
      state = {...state, users:state.users.concat(newUsers)}
      break;
    }
    case FETCH_USERS_FULFILLED: {
      const newUsers = action.payload.rows.map(function(user){ return (user.doc) });
      state = {...state, users:state.users.concat(newUsers)}
      break;
    }
  }
  return state;
};
