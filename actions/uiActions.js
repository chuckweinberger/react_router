import { SHOWING_ITEM_CHANGE } from '../constants/actionTypes';

exports.showingItemChange = (showingItemId=null) => {
  return ({
    type: SHOWING_ITEM_CHANGE,
    showingItemId
  });
}