import { createSelector } from 'reselect';

/**
  * COMMENT SELECTORS
  *
  *****************************************************************/

export const getCommentIds = state => state.blog.comments.ids;
export const getCommentsList = state => state.blog.comments.all;

export const selectComments = createSelector([getCommentIds, getCommentsList], (ids, all) => ids.map(id => all[id]));
