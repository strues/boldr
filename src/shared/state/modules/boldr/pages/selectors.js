import {createSelector} from 'reselect';

/**
  * TAG SELECTORS
  *
  *****************************************************************/

export const getPageIds = state => state.blog.pages.ids;
export const getPageList = state => state.blog.pages.all;

export const getPages = createSelector([getPageIds, getPageList], (ids, all) =>
  ids.map(id => all[id]),
);
