import { createSelector } from 'reselect';

/**
  * SETTINGS SELECTORS
  *
  *****************************************************************/
export const getSettings = (state) => state.boldr.settings;

export function selectSetting(state, key) {
  return state.boldr.settings[key];
}
