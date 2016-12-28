import { combineReducers } from 'redux';
import * as t from './constants';

const byLabel = (state = {}, action) => {
  switch (action.type) {
    case t.FETCH_MENUS_SUCCESS:
      Object.keys(action.payload.entities.menus).forEach(label => {
        Object.assign(action.payload.entities.menus[label]);
      });
      return {
        ...state,
        ...action.payload.entities.menus,
        loaded: true,

      };
    default:
      return state;
  }
};

const labels = (state = [], action) => {
  switch (action.type) {
    case t.FETCH_MENUS_SUCCESS:
      return [...state, ...action.payload.result];
    default:
      return state;
  }
};

const menuReducer = combineReducers({
  byLabel,
  labels,
});

export default menuReducer;
