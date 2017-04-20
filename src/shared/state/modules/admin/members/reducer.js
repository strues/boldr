import { combineReducers } from 'redux';
import * as t from './constants';

export const STATE_KEY = 'members';

const all = (state = {}, action) => {
  switch (action.type) {
    case t.LOAD_MEMBERS_SUCCESS:
    case t.UPDATE_MEMBER_SUCCESS:
      return {
        ...state,
        ...action.payload.entities.users,
      };

    default:
      return state;
  }
};

const ids = (state = [], action) => {
  switch (action.type) {
    case t.LOAD_MEMBERS_SUCCESS:
      return action.payload.result;
    default:
      return state;
  }
};

const isFetching = (state = false, action) => {
  switch (action.type) {
    case t.LOAD_MEMBERS_REQUEST:
    case t.UPDATE_MEMBER_REQUEST:
      return true;
    case t.LOAD_MEMBERS_SUCCESS:
    case t.UPDATE_MEMBER_SUCCESS:
    case t.LOAD_MEMBERS_FAILURE:
    case t.UPDATE_MEMBER_FAILURE:
      return false;
    default:
      return state;
  }
};

const currentMember = (state = {}, action) => {
  switch (action.type) {
    case t.MEMBER_SELECTED:
      return {
        ...state,
        ...action.payload,
      };
    default:
      return state;
  }
};

export default combineReducers({
  all,
  ids,
  isFetching,
  currentMember,
});
