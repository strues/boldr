import { combineReducers } from 'redux';
import articlesReducer from '../../state/dux/article';
import tagReducer from '../../state/dux/tag';

const blogReducer = combineReducers({
  articles: articlesReducer,
  tags: tagReducer,
});

export default blogReducer;
