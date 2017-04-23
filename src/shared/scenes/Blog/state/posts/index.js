import postsReducer, { getPublishedPosts, getFeaturedPosts } from './reducer';
import {
  togglePostLayoutView,
  fetchPostsIfNeeded,
  fetchPosts,
  fetchPost,
  fetchPostIfNeeded,
  createPost,
  deletePost,
  updatePost,
} from './actions';

import { getPostIds, getPostsList, getPosts } from './selectors';
import { post, arrayOfPost } from './schema';

export default postsReducer;

export {
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
};
