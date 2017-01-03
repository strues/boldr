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

export const getMenus = state => state.boldr.menu;
