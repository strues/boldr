import {combineReducers} from 'redux';

import postsReducer, {STATE_KEY as POSTS_STATE_KEY} from './posts';
import tagsReducer, {STATE_KEY as TAGS_STATE_KEY} from './tags';

export const STATE_KEY = 'blog';

const blogReducer = combineReducers({
  [POSTS_STATE_KEY]: postsReducer,
  [TAGS_STATE_KEY]: tagsReducer,
});

export default blogReducer;
