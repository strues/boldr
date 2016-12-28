import { combineReducers } from 'redux';
import postsReducer from './posts';

const blogReducer = combineReducers({
  posts: postsReducer,
});

export default blogReducer;
