import {
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
} from './articles';

import {
  tagsReducer,
  fetchTagsIfNeeded,
  fetchTagPosts,
  fetchTagArticlesIfNeeded,
  fetchTags,
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
  // tags
  tagsReducer,
  fetchTagsIfNeeded,
  fetchTagPosts,
  fetchTagArticlesIfNeeded,
  fetchTags,
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
