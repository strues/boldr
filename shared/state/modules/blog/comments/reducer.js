import { combineReducers } from 'redux';
import * as t from '../../actionTypes';

export const STATE_KEY = 'comments';

const all = (state = {}, action) => {
  switch (action.type) {
    case t.FETCH_POSTS_SUCCESS:
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
    // case t.FETCH_TAGS_SUCCESS:
    //   return action.payload.result;
    // case t.DELETE_TAG_SUCCESS:
    //   return removeIdFromArray(state, action.id);
    default:
      return state;
  }
};

export default combineReducers({
  all,
  ids,
});
