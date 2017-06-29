import { combineReducers } from 'redux';
import * as t from '../actionTypes';

const all = (state = {}, action) => {
  switch (action.type) {
    case t.FETCH_SETTINGS_SUCCESS:
      return {
        ...state,
        ...action.payload.entities.settings,
      };
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

const metaInitialState = {
  status: -1,
  initialPageLoad: true,
};

const meta = (state = metaInitialState, action) => {
  switch (action.type) {
    case t.INITIAL_PAGE_LOAD:
      return {
        ...state,
        initialPageLoad: false,
      };
    default:
      return state;
  }
};

const settingsReducer = combineReducers({
  all,
  ids,
  isFetching,
  meta,
});

export default settingsReducer;
