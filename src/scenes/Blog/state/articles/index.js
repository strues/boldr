import articlesReducer, { getPublishedArticles, getFeaturedArticles } from './reducer';
import { togglePostLayoutView, createArticle, deletePost, updateArticle } from './actions';

import { getArticleIds, getArticlesList, getArticles } from './selectors';

export default articlesReducer;

export {
  articlesReducer,
  togglePostLayoutView,
  createArticle,
  deletePost,
  updateArticle,
  getArticleIds,
  getArticlesList,
  getArticles,
  getPublishedArticles,
  getFeaturedArticles,
};
