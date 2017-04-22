import { combineReducers } from 'redux';

import {
  postsReducer,
  tagsReducer,
  POSTS_STATE_KEY,
  TAGS_STATE_KEY,
} from './index';

export const STATE_KEY = 'blog';

const blogReducer = combineReducers({
  [POSTS_STATE_KEY]: postsReducer,
  [TAGS_STATE_KEY]: tagsReducer,
});

export default blogReducer;
