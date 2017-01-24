import postsReducer, { STATE_KEY } from './posts';
import {
  togglePostLayoutView,
  fetchPostsIfNeeded,
  fetchPosts,
  createPost,
  deletePost,
  updatePost,
  fetchPostFromSlug,
} from './actions';

import { getPosts, getTagEntities } from './selectors';

export default postsReducer;

export {
  togglePostLayoutView,
  fetchPostsIfNeeded,
  fetchPosts,
  createPost,
  fetchPostFromSlug,
  deletePost,
  updatePost,
  getPosts,
  getTagEntities,
  STATE_KEY,
};
