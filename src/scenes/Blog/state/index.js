import { articlesReducer, togglePostLayoutView } from './articles';

import { tagsReducer, selectTag, clearTag } from './tags';

import blogReducer from './reducer';

export {
  // main reducer
  blogReducer,
  // posts
  articlesReducer,
  togglePostLayoutView,
  // tags
  tagsReducer,
  selectTag,
  clearTag,
};

export default blogReducer;
