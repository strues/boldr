import postsReducer, {STATE_KEY} from './reducer';
import {
  togglePostLayoutView,
  fetchPostsIfNeeded,
  fetchPosts,
  createPost,
  deletePost,
  updatePost,
  fetchPostIfNeeded,
  fetchPostFromSlug,
} from './actions';

import {getPosts, getTagEntities} from './selectors';

export default postsReducer;

export {
  togglePostLayoutView,
  fetchPostIfNeeded,
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
