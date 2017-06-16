/* @flow */
import { combineReducers } from 'redux';
import removeIdFromArray from 'boldr-utils/lib/arrays/removeIdFromArray';
import removeByKey from 'boldr-utils/lib/objects/removeByKey';
import * as t from '../actionTypes';
import { getArticles } from './selectors';

const all = (state = {}, action) => {
  switch (action.type) {
    case t.CREATE_ARTICLE_SUCCESS:
      return {
        ...state,
        ...action.payload.entities.articles,
      };
    case t.DELETE_ARTICLE_SUCCESS:
      return removeByKey(state, action.id);
    default:
      return state;
  }
};

const ids = (state = [], action) => {
  switch (action.type) {
    case t.DELETE_ARTICLE_SUCCESS:
      return removeIdFromArray(state, action.id);
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

export const getPublishedArticles = (state: Object, filter: string): Function => {
  const allPosts = getArticles(state);
  switch (filter) {
    case 'all':
      return getArticles(state);
    case 'published':
      return allPosts.filter(p => p.published) && allPosts.filter(p => !p.featured);
    case 'draft':
      return allPosts.filter(p => !p.published);
    default:
      return getArticles(state);
  }
};

export const getFeaturedArticles = (state: Object, filter: string): Function => {
  const allPosts = getArticles(state);
  switch (filter) {
    case 'all':
      return allPosts;
    case 'featured':
      return allPosts.filter(p => p.featured);
    case 'not':
      return allPosts.filter(p => !p.featured);
    default:
      throw new Error(`Unknown filter: ${filter}.`);
  }
};
