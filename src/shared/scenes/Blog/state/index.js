import {
  postsReducer,
  POSTS_STATE_KEY,
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
} from './posts';

import {
  tagsReducer,
  TAGS_STATE_KEY,
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

import blogReducer, { STATE_KEY as BLOG_STATE_KEY } from './reducer';

export {
  // main reducer
  blogReducer,
  BLOG_STATE_KEY,
  // posts
  postsReducer,
  POSTS_STATE_KEY,
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
  // tags
  tagsReducer,
  TAGS_STATE_KEY,
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
