import { combineReducers } from 'redux';
import * as t from './constants';

const byLabel = (state = { loaded: false }, action) => {
  switch (action.type) {
    case t.LOAD_NAVIGATION_SUCCESS:
      Object.keys(action.payload.entities.navigations).forEach(label => {
        Object.assign(action.payload.entities.navigations[label]);
      });
      return {
        ...state,
        ...action.payload.entities.navigations,
        loaded: true,

      };
    default:
      return state;
  }
};

const labels = (state = [], action) => {
  switch (action.type) {
    case t.LOAD_NAVIGATION_SUCCESS:
      return [...state, ...action.payload.result];
    default:
      return state;
  }
};

const navReducer = combineReducers({
  byLabel,
  labels,
});

export default navReducer;
