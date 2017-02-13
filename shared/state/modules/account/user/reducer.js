import { combineReducers } from 'redux';
import * as t from '../../actionTypes';

export const STATE_KEY = 'user';

const INITIAL_USER_STATE = {
  id: '',
  email: '',
  firstName: '',
  lastName: '',
  username: '',
  location: '',
  avatarUrl: '',
  social: {},
  website: '',
  bio: '',
  role: '',
  roleId: '',
};

function userReducer(state = INITIAL_USER_STATE, action = {}) {
  switch (action.type) {
    case t.LOGIN_SUCCESS:
    case t.CHECK_AUTH_SUCCESS:
      return {
        ...state,
        id: action.user.id,
        email: action.user.email,
        firstName: action.user.first_name,
        lastName: action.user.last_name,
        username: action.user.username,
        avatarUrl: action.user.avatar_url,
        location: action.user.location,
        bio: action.user.bio,
        website: action.user.website,
        social: action.user.social,
        role: action.user.roles[0].name,
        roleId: action.user.roles[0].id,
      };
    case t.EDIT_PROFILE_SUCCESS:
      return {
        ...state,
        id: action.payload.id,
        email: action.payload.email,
        firstName: action.payload.first_name,
        lastName: action.payload.last_name,
        username: action.payload.username,
        avatarUrl: action.payload.avatar_url,
        social: action.payload.social,
        location: action.payload.location,
        website: action.payload.website,
        bio: action.payload.bio,
      };
    case t.LOGOUT_USER:
      return {
        ...state,
        id: '',
        email: '',
        firstName: '',
        lastName: '',
        username: '',
        location: '',
        avatarUrl: '',
        social: {},
        website: '',
        bio: '',
        role: '',
        roleId: '',
      };
    default:
      return state;
  }
}

export default userReducer;
