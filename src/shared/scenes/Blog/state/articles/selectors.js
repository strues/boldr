import { createSelector } from 'reselect';

/**
  * ARTICLE SELECTORS
  *
  *****************************************************************/
export const getArticleIds = state => state.blog.articles.ids;
export const getArticlesList = state => state.blog.articles.all;

export const getArticles = createSelector(
  [getArticleIds, getArticlesList],
  (ids, all) => ids.map(id => all[id]),
);
