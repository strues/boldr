import {createSelector} from 'reselect';

export const getMediaIds = state => state.media.ids;
export const getMediaList = state => state.media.all;

export const getMedia = createSelector(
  [getMediaIds, getMediaList],
  (ids, all) => ids.map(id => all[id]),
);
