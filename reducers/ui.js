import { FETCHING, END_FETCHING, SHOWING_ITEM_CHANGE } from '../constants/actionTypes'

const initialState = {
  showingItemId: null,
  fetching: false
}

export default function uiReducer(state = initialState, action) {
  
  switch (action.type) {
    case FETCHING: 
      return { ...state, fetching: true }      
      break;
    
    case END_FETCHING:
      return { ...state, fetching: false }
      break;
    
    case SHOWING_ITEM_CHANGE:
      return { ...state, showingItemId: action.showingItemId };
      break;
    
    default:
      return state;
    }

};