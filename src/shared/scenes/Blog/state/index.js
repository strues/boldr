import {
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
} from './articles';

import {
  tagsReducer,
  selectTag,
  clearTag,
  createTag,
  deleteTag,
  getTagIds,
  getTagsList,
  getTags,
} from './tags';

import blogReducer from './reducer';

export {
  // main reducer
  blogReducer,
  // posts
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
  // tags
  tagsReducer,
  selectTag,
  clearTag,
  createTag,
  deleteTag,
  getTagIds,
  getTagsList,
  getTags,
};

export default blogReducer;
