import { combineReducers } from 'redux';

import articlesReducer from './articles/reducer';
import tagsReducer from './tags/reducer';

const blogReducer = combineReducers({
  articles: articlesReducer,
  tags: tagsReducer,
});

export default blogReducer;
