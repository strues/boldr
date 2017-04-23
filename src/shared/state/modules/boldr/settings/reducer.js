import { combineReducers } from 'redux';
import * as t from '../actionTypes';

export const STATE_KEY = 'settings';

const all = (state = {}, action) => {
  switch (action.type) {
    case t.FETCH_SETTINGS_SUCCESS:
      return {
        ...state,
        ...action.payload.entities.settings,
      };
    // case t.ADD_TAG_SUCCESS:
    //   return {
    //     ...state,
    //     ...action.payload,
    //   };


    default:
      return state;
  }
};

const ids = (state = [], action) => {
  switch (action.type) {
    case t.FETCH_SETTINGS_SUCCESS:
      return action.payload.result;

    default:
      return state;
  }
};

const isFetching = (state = false, action) => {
  switch (action.type) {
    case t.FETCH_SETTINGS_REQUEST:
      return true;
    case t.FETCH_SETTINGS_SUCCESS:
    case t.FETCH_SETTINGS_FAILURE:
      return false;
    default:
      return state;
  }
};

const settingsReducer = combineReducers({
  all,
  ids,
  isFetching,
});

export default settingsReducer;
