import { ADD_USER, ADD_USERS, FETCH_USERS_FULFILLED, PURGE_USERS } from '../constants/actionTypes'

const initialState = {
  users: [],
  bookmark: "",
  totalRows: 0
}

export default function users(state=initialState, action) {
  
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
      state = { ...state, 
                users:state.users.concat(newUsers), 
                bookmark: action.payload.bookmark,
                totalRows: action.payload.total_rows
              }
      break;
    }
    case PURGE_USERS: {
      state = initialState;
      break;
    }
  }
  return state;
};
