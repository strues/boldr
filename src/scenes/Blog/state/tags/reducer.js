import { combineReducers } from 'redux';

import * as t from '../actionTypes';

const all = (state = {}, action) => {
  switch (action.type) {
    case t.FETCH_TAGS_SUCCESS:
    case t.FETCH_ARTICLES_SUCCESS:
      return {
        ...state,
        ...action.payload.entities.tags,
      };
    case t.ADD_TAG_SUCCESS:
      return {
        ...state,
        ...action.payload,
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
    case t.FETCH_TAGGED_POST_REQUEST:
    case t.ADD_TAG_REQUEST:
      return true;
    case t.FETCH_TAGS_SUCCESS:
    case t.FETCH_TAGS_FAILURE:
    case t.FETCH_TAGGED_POST_SUCCESS:
    case t.FETCH_TAGGED_POST_FAILURE:
    case t.ADD_TAG_SUCCESS:
    case t.ADD_TAG_FAILURE:
      return false;
    default:
      return state;
  }
};

const currentTag = (state = {}, action) => {
  switch (action.type) {
    case t.FETCH_TAGGED_POST_SUCCESS:
      return {
        ...state,
        ...action.payload,
      };
    case t.SELECT_TAG:
      return {
        ...state,
        ...action.tag,
      };

    default:
      return state;
  }
};
const tagsReducer = combineReducers({
  all,
  ids,
  isFetching,
  currentTag,
});

export default tagsReducer;
