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

export function selectSetting(state, key) {
  return state.boldr.settings.byKey[key];
}
