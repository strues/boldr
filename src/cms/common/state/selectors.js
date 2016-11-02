import { createSelector } from 'reselect';

// Settings
export const getSettings = createSelector(
  [
    (state) => state.boldr.settings.keys,
    (state) => state.boldr.settings.byKey
  ],
  (keys, byKey) => keys.map(key => byKey[key])
);

export function areSettingsLoaded(globalState) {
  return globalState.boldr.settings && globalState.boldr.settings.loaded;
}
// Posts
export const getPosts = state => state.posts.list;

// Navigation
export const listNavLabels = state => state.boldr.nav.labels; // array
export const getNavEntities = state => state.boldr.nav.byLabel; // objects

export function getByLabel(state, label) {
  return state.boldr.nav.byLabel[label];
}

export const getNavs = createSelector(
  [listNavLabels, getNavEntities],
  //  (state) => state.boldr.nav.labels,
  //  (state) => state.boldr.nav.byLabel
  (labels, byLabel) => labels.map(label => byLabel[label])
);
export function isNavLoaded(globalState) {
  return globalState.boldr.nav && globalState.boldr.nav.byLabel.loaded;
}

// pages
export function arePagesLoaded(globalState) {
  return globalState.boldr.pages && globalState.boldr.pages.loaded;
}
