import { combineReducers } from 'redux';
import * as t from '../actionTypes';

const all = (state = {}, action) => {
  switch (action.type) {
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
    default:
      return state;
  }
};

const isFetching = (state = false, action) => {
  switch (action.type) {
    case t.UPDATE_MEMBER_REQUEST:
      return true;
    case t.UPDATE_MEMBER_SUCCESS:
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

const membersReducer = combineReducers({
  all,
  ids,
  isFetching,
  currentMember,
});

export default membersReducer;
