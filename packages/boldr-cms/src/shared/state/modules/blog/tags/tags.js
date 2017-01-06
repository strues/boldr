import { combineReducers } from 'redux';
import { FETCH_POSTS_SUCCESS } from '../posts/constants';
import * as t from './constants';

export const STATE_KEY = 'tags';

const all = (state = {}, action) => {
  switch (action.type) {
    case t.FETCH_TAGS_SUCCESS:
    case FETCH_POSTS_SUCCESS:
      return {
        ...state,
        ...action.payload.entities.tags,
      };
    default:
      return state;
  }
};

const ids = (state = [], action) => {
  switch (action.type) {
    case t.FETCH_TAGS_SUCCESS:
      return action.payload.result;
    default:
      return state;
  }
};


const isFetching = (state = false, action) => {
  switch (action.type) {
    case t.FETCH_TAGS_REQUEST:
      return true;
    case t.FETCH_TAGS_SUCCESS:
    case t.FETCH_TAGS_FAILURE:
      return false;
    default:
      return state;
  }
};

export default combineReducers({
  all,
  ids,
  isFetching,
});
