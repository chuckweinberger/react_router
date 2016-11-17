import * as actions from '../constants/actionTypes'

const initialState = {
  showingItemId: null,
  fetching: false,
  formFields: {},
  modalType: null,
  modalProps: {}
}

export default function uiReducer(state = initialState, action) {
  
  switch (action.type) {
    case actions.FETCHING: 
      return { ...state, fetching: true }      
      break;
    case actions.END_FETCHING:
      return { ...state, fetching: false }
      break;
    case actions.SHOWING_ITEM_CHANGE:
      return { ...state, showingItemId: action.showingItemId };
      break;
    case actions.SHOW_MODAL:
      return { ...state, modalType: action.payload.modal.modalType, modalProps: action.payload.modal.modalProps }
      break;
    case actions.HIDE_MODAL:
      return { ...state, modalType: null, modalProps: {} }
      break;
    default:
      return state;
    }

};