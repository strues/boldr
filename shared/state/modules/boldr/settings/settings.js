import { createSelector } from 'reselect';
import { combineReducers } from 'redux';
import uniq from 'lodash/uniq';
import * as t from './constants';

export const getSettings = createSelector(
  [
    (state) => state.boldr.settings.keys,
    (state) => state.boldr.settings.byKey,
  ],
  (keys, byKey) => keys.map(key => byKey[key]),
);

function settingsReducer(state = [], action) {
  switch (action.type) {
    case t.FETCH_SETTINGS_SUCCESS:
      return [
        ...state,
        ...action.payload,
      ];

    case t.FETCH_SETTING_SUCCESS:
      return [...state, uniq(action.payload.result)];

    case t.DELETE_SETTING:
      return state.filter(key => key !== action.key);

    default:
      return state;
  }
}

export function isLoaded(globalState) {
  return globalState.boldr.settings && globalState.boldr.settings.loaded;
}


export default settingsReducer;
