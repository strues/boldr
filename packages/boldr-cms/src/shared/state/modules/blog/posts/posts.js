/* @flow */
import { combineReducers } from 'redux';
import * as api from '../../../../core/api';
import * as notif from '../../../../core/constants';
import type { Post } from '../../../../types/models';
import { removeByKey, removeIdFromArray } from '../../../../core/utils/immutableUtils';
import { notificationSend } from '../../../../state/modules/notifications';

import * as t from './constants';

export const STATE_KEY = 'posts';

const all = (state = {}, action) => {
  switch (action.type) {
    case t.FETCH_POSTS_SUCCESS:
      return {
        ...state,
        ...action.payload.entities.posts,
      };
    case t.DELETE_POST_SUCCESS:
      return removeByKey(state, action.id);
    default:
      return state;
  }
};

const ids = (state = [], action) => {
  switch (action.type) {
    case t.FETCH_POSTS_SUCCESS:
      return action.payload.result;
    case t.DELETE_POST_SUCCESS:
      return removeIdFromArray(state, action.id);
    default:
      return state;
  }
};


const isFetching = (state = false, action) => {
  switch (action.type) {
    case t.FETCH_POSTS_REQUEST:
    case t.CREATE_POST_REQUEST:
      return true;
    case t.FETCH_POSTS_SUCCESS:
    case t.CREATE_POST_SUCCESS:
      return false;
    default:
      return state;
  }
};

const currentPost = (state = {}, action) => {
  switch (action.type) {
    case t.SELECT_POST:
      return {
        ...state,
        ...action.post,
      };
    default:
      return state;
  }
};

/**
 *  postsReducer
 * @param  {Object} state       The initial state
 * @param  {Object} action      The action object
 */


export default combineReducers({
  all,
  ids,
  isFetching,
  currentPost,
});
