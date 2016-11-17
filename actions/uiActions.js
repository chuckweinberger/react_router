import * as actions from '../constants/actionTypes';


exports.showingItemChange = (showingItemId=null) => ({
    type: actions.SHOWING_ITEM_CHANGE,
    showingItemId
});

exports.showModal = ( modal = { modalType: null, modalProps: {} }) => ({
  type: actions.SHOW_MODAL,
  payload: modal
});

exports.hideModal = () => ({
  type: actions.HIDE_MODAL
})

