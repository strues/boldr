/* @flow */
import { combineReducers } from 'redux';
import * as api from '../../../../core/api';
import * as notif from '../../../../core/constants';
import type { Post } from '../../../../types/models';
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
    default:
      return state;
  }
};

const ids = (state = [], action) => {
  switch (action.type) {
    case t.FETCH_POSTS_SUCCESS:
      return action.payload.result;
    default:
      return state;
  }
};


const isFetching = (state = false, action) => {
  switch (action.type) {
    case t.FETCH_POSTS_REQUEST:
      return true;
    case t.FETCH_POSTS_SUCCESS:
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


export type State = { loading: boolean, error: null, list: Array<String>, bySlug: Post }
//
// Reducer
// -----------------
const INITIAL_STATE = {
  loading: false,
  loaded: false,
  error: null,
  list: [],
  bySlug: {},
};

/**
 *  postsReducer
 * @param  {Object} state       The initial state
 * @param  {Object} action      The action object
 */

function posts(state: State = INITIAL_STATE, action: Object) {
  switch (action.type) {
    case t.FETCH_POSTS_REQUEST:
    case t.GET_POST_REQUEST:
    case t.CREATE_POST_REQUEST:
    case t.DELETE_POST_REQUEST:
      return {
        ...state,
        loading: true,
        loaded: false,
      };
    case t.FETCH_POSTS_SUCCESS:
      return {
        ...state,
        loading: false,
        loaded: true,
        items: action.payload.entities.posts,
        list: action.payload.result,
      };
    case t.GET_POST_SUCCESS:
      return {
        ...state,
        loading: false,
        loaded: true,
        current: action.payload,
      };
    case t.CREATE_POST_SUCCESS:
      return {
        ...state,
        loaded: true,
        loading: false,
      };
    case t.DELETE_POST_SUCCESS:
      return {
        ...state,
        entities: [...state.entities].filter((entity) => entity.id !== action.id),
      };
    case t.FETCH_POSTS_FAILURE:
    case t.GET_POST_FAILURE:
    case t.CREATE_POST_FAILURE:
    case t.DELETE_POST_FAILURE:
      return {
        ...state,
        loading: false,
        loaded: true,
        error: action.error,
      };
    case t.SELECT_POST:
      return {
        ...state,
        post: action.post,
      };
    case t.SELECT_POST_SUCCESS:
      return {
        ...state,
        loading: false,
        current: action.current,
        isEditing: true,
      };
    case t.SELECT_POST_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.error,
        isEditing: true,
      };
    case t.TOGGLE_POST_LAYOUT:
      return {
        ...state,
      };
    default:
      return state;
  }
}
export default combineReducers({
  all,
  ids,
  isFetching,
  currentPost,
  posts,
});
