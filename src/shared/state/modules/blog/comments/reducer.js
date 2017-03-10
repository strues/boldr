import { combineReducers } from 'redux';
import * as t from '../../actionTypes';

export const STATE_KEY = 'comments';

const all = (state = {}, action) => {
  switch (action.type) {
    case t.FETCH_POSTS_SUCCESS:
    case t.CREATE_COMMENT_SUCCESS:
      return {
        ...state,
        ...action.payload.entities.comments,
      };

    default:
      return state;
  }
};

const ids = (state = [], action) => {
  switch (action.type) {
    case t.FETCH_COMMENTS_SUCCESS:
      return [...state, ...action.response.result];
    case t.CREATE_COMMENT_SUCCESS:
      return [...state, action.payload.result];
    default:
      return state;
  }
};

export default combineReducers({
  all,
  ids,
});
