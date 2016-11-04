import { createSelector } from 'reselect';
import { combineReducers } from 'redux';
import * as t from './constants';

export const listNavLabels = state => state.boldr.nav.labels; // array
export const getNavEntities = state => state.boldr.nav.byLabel; // objects

export function getByLabel(state, label) {
  return state.boldr.nav.byLabel[label];
}

export const getNavs = createSelector(
  [
    listNavLabels, getNavEntities,
  //  (state) => state.boldr.nav.labels,
  //  (state) => state.boldr.nav.byLabel
  ],
  (labels, byLabel) => labels.map(label => byLabel[label]),
);

const byLabel = (state = { loaded: false }, action) => {
  let nextState;
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
