import postsReducer, { STATE_KEY as POSTS_STATE_KEY } from './reducer';
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
};
