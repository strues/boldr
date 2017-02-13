import { combineReducers } from 'redux';
import postsReducer, { STATE_KEY as POSTS_STATE_KEY } from './posts';
import tagsReducer, { STATE_KEY as TAGS_STATE_KEY } from './tags';
import commentsReducer, { STATE_KEY as COMMENTS_STATE_KEY } from './comments';

export const STATE_KEY = 'blog';

const blogReducer = combineReducers({
  [POSTS_STATE_KEY]: postsReducer,
  [TAGS_STATE_KEY]: tagsReducer,
  [COMMENTS_STATE_KEY]: commentsReducer,
});

export default blogReducer;
