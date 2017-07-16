import { combineReducers } from 'redux';
import * as t from './actionTypes';

const currentArticle = (state = {}, action) => {
  switch (action.type) {
    case t.SELECT_ARTICLE:
      return {
        ...state,
        ...action.article,
      };
    default:
      return state;
  }
};

const currentTag = (state = {}, action) => {
  switch (action.type) {
    case t.SELECT_TAG:
      return {
        ...state,
        ...action.tag,
      };

    default:
      return state;
  }
};

const blogReducer = combineReducers({
  currentArticle,
  currentTag,
});

export default blogReducer;
