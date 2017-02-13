import { combineReducers } from 'redux';
import * as t from '../actionTypes';

export const STATE_KEY = 'global';

function loading(state = false, action) {
  switch (action.type) {

    default:
      return state;
  }
}

function error(state = false, action) {
  switch (action.type) {

    default:
      return state;
  }
}
export default combineReducers({
  loading,
  error,
});
