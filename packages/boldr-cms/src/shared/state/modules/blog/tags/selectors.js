import { createSelector } from 'reselect';

/**
  * TAG SELECTORS
  *
  *****************************************************************/

export const getTagIds = state => state.blog.tags.ids;
export const getTagsList = state => state.blog.tags.all;

export const getTags = createSelector(
  [getTagIds, getTagsList],
  (ids, all) => ids.map(id => all[id])
);
