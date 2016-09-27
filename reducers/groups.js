import { FETCH_GROUPS_PENDING, FETCH_GROUPS_FULFILLED, FETCH_GROUPS_REJECTED, PURGE_GROUPS } from '../constants/actionTypes'

const initialState = {
  groups: [],
  bookmark: "",
  totalRows: 0,
  fetching: false,
  fetched: false,
  errors:null
}

export default function groups(state=initialState, action) {
  
  switch (action.type) {
    case FETCH_GROUPS_PENDING: {
      state = { ...state,
                fetching: true,
                fetched: false }
      break
    }
    case FETCH_GROUPS_FULFILLED: {
      const newGroups = action.payload.rows.map(function(group){ return (group.doc) });
      state = { ...state, 
                groups:state.groups.concat(newGroups), 
                bookmark: action.payload.bookmark,
                totalRows: action.payload.total_rows,
                fetching:false,
                fetched:true,
                errors:null
              }
      break;
    }
    case PURGE_GROUPS: {
      state = initialState;
      break;
    }
    case FETCH_GROUPS_REJECTED: {
      state = { ...state,
                errors: action.payload,
                fetched: false,
                fetching: false}
      
    }
  }
  return state;
};
