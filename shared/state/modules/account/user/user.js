import { combineReducers } from 'redux';
import * as t from '../constants';

export const STATE_KEY = 'user';

const INITIAL_USER_STATE = {
  email: '',
  firstName: '',
  lastName: '',
  username: '',
  avatarUrl: '',
  role: '',
  roleId: '',
};

function userReducer(state = INITIAL_USER_STATE, action = {}) {
  switch (action.type) {
    case t.LOGIN_SUCCESS:
    case t.CHECK_AUTH_SUCCESS:
      return {
        ...state,
        email: action.user.email,
        firstName: action.user.first_name,
        lastName: action.user.last_name,
        username: action.user.username,
        avatarUrl: action.user.avatar_url,
        role: action.user.roles[0].name,
        roleId: action.user.roles[0].id,
      };
    case t.LOGOUT_USER:
      return {
        ...state,
        email: '',
        firstName: '',
        lastName: '',
        username: '',
        avatarUrl: '',
        role: '',
        roleId: '',
      };
    default:
      return state;
  }
}

export default userReducer;
