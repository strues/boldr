import { createSelector } from 'reselect';
import { combineReducers } from 'redux';
import { uniq } from 'lodash';
import * as t from './constants';

export const getSettings = createSelector(
  [
    (state) => state.boldr.settings.keys,
    (state) => state.boldr.settings.byKey,
  ],
  (keys, byKey) => keys.map(key => byKey[key]),
);

const byKey = (state = {}, action) => {
  let nextState;
  switch (action.type) {
    case t.FETCH_SETTINGS_SUCCESS:
      Object.keys(action.payload.entities.settings).forEach((key) => {
        Object.assign(action.payload.entities.settings[key]);
      });
      return {
        ...state,
        ...action.payload.entities.settings,
      };

    case t.EDIT_SETTING:
      nextState = { ...state };
      nextState[action.key] = {
        ...state[action.key],
        key: action.key,
        value: action.value,
        description: action.description,
      };

      return nextState;
    case t.DELETE_SETTING:
      nextState = { ...state };
      delete nextState[action.key];

      return nextState;

    default:
      return state;
  }
};

const keys = (state = [], action) => {
  switch (action.type) {
    case t.FETCH_SETTINGS_SUCCESS:
      return [...state, ...action.payload.result];

    case t.FETCH_SETTING_SUCCESS:
      return [...state, uniq(action.payload.result)];

    case t.DELETE_SETTING:
      return state.filter(key => key !== action.key);

    default:
      return state;
  }
};


const settingsReducer = combineReducers({
  byKey,
  keys,
});

export function isLoaded(globalState) {
  return globalState.boldr.settings && globalState.boldr.settings.loaded;
}


export default settingsReducer;
