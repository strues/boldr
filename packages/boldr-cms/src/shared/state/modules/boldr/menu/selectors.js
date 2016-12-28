import { createSelector } from 'reselect';

/**
  * MENU SELECTORS
  *
  *****************************************************************/

export const listMenuLabels = state => state.boldr.menu.labels;
export const getMenuEntities = state => state.boldr.menu.byLabel;

export function getByLabel(state, label) {
  return state.boldr.menu.byLabel[label];
}

export const getMenus = createSelector(
  [listMenuLabels, getMenuEntities],
  //  (state) => state.boldr.nav.labels,
  //  (state) => state.boldr.nav.byLabel
  (labels, byLabel) => labels.map(label => byLabel[label]),
);
