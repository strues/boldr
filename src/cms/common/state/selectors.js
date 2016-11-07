import { createSelector } from 'reselect';

/**
  * SETTINGS SELECTORS
  *
  *****************************************************************/
export const getSettings = createSelector(
  [
    (state) => state.boldr.settings.keys,
    (state) => state.boldr.settings.byKey,
  ],
  (keys, byKey) => keys.map(key => byKey[key]),
);

export function areSettingsLoaded(globalState) {
  return globalState.boldr.settings && globalState.boldr.settings.loaded;
}

/**
  * POSTS SELECTORS
  *
  *****************************************************************/
export const getPosts = state => state.posts.list;


/**
  * NAVIGATION SELECTORS
  *
  *****************************************************************/

export const listNavLabels = state => state.boldr.nav.labels;
export const getNavEntities = state => state.boldr.nav.byLabel;

export function getByLabel(state, label) {
  return state.boldr.nav.byLabel[label];
}

export const getNavs = createSelector(
  [listNavLabels, getNavEntities],
  //  (state) => state.boldr.nav.labels,
  //  (state) => state.boldr.nav.byLabel
  (labels, byLabel) => labels.map(label => byLabel[label]),
);

export function isNavLoaded(globalState) {
  return globalState.boldr.nav && globalState.boldr.nav.byLabel.loaded;
}

/**
  * PAGE SELECTORS
  *
  *****************************************************************/

export function arePagesLoaded(globalState) {
  return globalState.boldr.pages && globalState.boldr.pages.loaded;
}
export const getPages = createSelector(
  [
    (state) => state.boldr.pages.ids,
    (state) => state.boldr.pages.all,
  ],
  (ids, all) => ids.map(id => all[id]),
);

/**
  * AUTH SELECTORS
  *
  *****************************************************************/
export function isAuthLoaded(globalState) {
  return globalState.auth && globalState.auth.loaded;
}
