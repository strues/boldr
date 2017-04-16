import {createSelector} from 'reselect';

/**
  * POSTS SELECTORS
  *
  *****************************************************************/
export const getPostIds = state => state.blog.posts.ids;
export const getPostsList = state => state.blog.posts.all;

export const getPosts = createSelector([getPostIds, getPostsList], (ids, all) =>
  ids.map(id => all[id]),
);
