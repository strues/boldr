import {
  articlesReducer,
  togglePostLayoutView,
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
  arrayOfTag,
  tag,
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
  article,
  arrayOfArticle,
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
  arrayOfTag,
  tag,
};

export default blogReducer;
