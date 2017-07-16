/* @flow */
import { combineReducers } from 'redux';
import * as t from '../actionTypes';

const all = (state = {}, action) => {
  switch (action.type) {
    case t.CREATE_ARTICLE_SUCCESS:
      return {
        ...state,
        ...action.payload.entities.articles,
      };
    default:
      return state;
  }
};

const ids = (state = [], action) => {
  switch (action.type) {
    default:
      return state;
  }
};

const isFetching = (state = false, action) => {
  switch (action.type) {
    case t.CREATE_ARTICLE_REQUEST:
      return true;
    case t.CREATE_ARTICLE_SUCCESS:
      return false;
    default:
      return state;
  }
};

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

/**
 *  articlesReducer
 * @param  {Object} state       The initial state
 * @param  {Object} action      The action object
 */

const articlesReducer = combineReducers({
  all,
  ids,
  isFetching,
  currentArticle,
});

export default articlesReducer;
