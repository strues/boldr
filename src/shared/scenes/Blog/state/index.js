import {
  postsReducer,
  togglePostLayoutView,
  fetchPostsIfNeeded,
  fetchPosts,
  fetchPost,
  fetchPostIfNeeded,
  createPost,
  deletePost,
  updatePost,
  getPostIds,
  getPostsList,
  getPosts,
  post,
  arrayOfPost,
  getPublishedPosts,
  getFeaturedPosts,
} from './posts';

import {
  tagsReducer,
  fetchTagsIfNeeded,
  fetchTagPosts,
  fetchTagPostsIfNeeded,
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
  postsReducer,
  togglePostLayoutView,
  fetchPostsIfNeeded,
  fetchPosts,
  fetchPost,
  fetchPostIfNeeded,
  createPost,
  deletePost,
  updatePost,
  getPostIds,
  getPostsList,
  getPosts,
  post,
  arrayOfPost,
  getPublishedPosts,
  getFeaturedPosts,
  // tags
  tagsReducer,
  fetchTagsIfNeeded,
  fetchTagPosts,
  fetchTagPostsIfNeeded,
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
