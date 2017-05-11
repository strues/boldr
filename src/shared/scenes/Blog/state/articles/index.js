import articlesReducer, {
  getPublishedArticles,
  getFeaturedArticles,
} from './reducer';
import {
  togglePostLayoutView,
  fetchArticlesIfNeeded,
  fetchArticles,
  fetchArticle,
  fetchArticleIfNeeded,
  createArticle,
  deletePost,
  updateArticle,
} from './actions';

import { getArticleIds, getArticlesList, getArticles } from './selectors';
import { article, arrayOfArticle } from './schema';

export default articlesReducer;

export {
  articlesReducer,
  togglePostLayoutView,
  fetchArticlesIfNeeded,
  fetchArticles,
  fetchArticle,
  fetchArticleIfNeeded,
  createArticle,
  deletePost,
  updateArticle,
  getArticleIds,
  getArticlesList,
  getArticles,
  article,
  arrayOfArticle,
  getPublishedArticles,
  getFeaturedArticles,
};
