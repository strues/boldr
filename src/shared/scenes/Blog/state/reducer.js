import { combineReducers } from 'redux';

import postsReducer from './posts/reducer';
import tagsReducer from './tags/reducer';

const blogReducer = combineReducers({
  posts: postsReducer,
  tags: tagsReducer,
});

export default blogReducer;
