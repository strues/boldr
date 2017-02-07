import { createSelector } from 'reselect';

/**
  * SETTINGS SELECTORS
  *
  *****************************************************************/

export const getSettingIds = state => state.boldr.settings.ids;
export const getSettingList = state => state.boldr.settings.all;
export const getSettingFromList = (state, id) => state.boldr.settings.all[id];

export const getSettings = createSelector(
  [getSettingIds, getSettingList],
  (ids, all) => ids.map(id => all[id])
);
