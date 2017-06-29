import { combineReducers } from 'redux';
import {
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  CHECK_AUTH_SUCCESS,
  LOGOUT,
} from '../../scenes/Account/state/actionTypes';
import * as t from './actionTypes';

const isFetching = (state = false, action) => {
  switch (action.type) {
    case LOGIN_REQUEST:
    case t.FORGOT_PASSWORD_REQUEST:
    case t.RESET_PASSWORD_REQUEST:
      return true;
    case LOGIN_SUCCESS:
    case t.RESET_PASSWORD_SUCCESS:
    case t.FORGOT_PASSWORD_SUCCESS:
    case t.FORGOT_PASSWORD_FAILURE:
    case t.RESET_PASSWORD_FAILURE:
      return false;
    default:
      return state;
  }
};

const INITIAL_STATE = {
  id: '',
  email: '',
  firstName: '',
  lastName: '',
  username: '',
  location: '',
  avatarUrl: '',
  profileImage: '',
  website: '',
  bio: '',
  role: '',
  roleId: '',
  socialMedia: {},
};

const me = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case CHECK_AUTH_SUCCESS:
      return {
        ...state,
        id: action.user.id,
        email: action.user.email,
        firstName: action.user.firstName,
        lastName: action.user.lastName,
        username: action.user.username,
        avatarUrl: action.user.avatarUrl,
        profileImage: action.user.profileImage,
        location: action.user.location,
        bio: action.user.bio,
        website: action.user.website,
        socialMedia: action.user.socialMedia,
        role: action.user.roles[0].name,
        roleId: action.user.roles[0].id,
      };
    case t.EDIT_PROFILE_SUCCESS:
      return {
        ...state,
        id: action.payload.id,
        email: action.payload.email,
        firstName: action.payload.firstName,
        lastName: action.payload.lastName,
        username: action.payload.username,
        avatarUrl: action.payload.avatarUrl,
        profileImage: action.payload.profileImage,
        socialMedia: action.payload.socialMedia,
        location: action.payload.location,
        website: action.payload.website,
        bio: action.payload.bio,
      };
    case LOGOUT:
      return {
        ...state,
        id: '',
        email: '',
        firstName: '',
        lastName: '',
        username: '',
        location: '',
        avatarUrl: '',
        profileImg: '',
        socialMedia: {},
        website: '',
        bio: '',
        role: '',
        roleId: '',
      };
    case '@boldr/user/SET_USER_LOGGED_IN':
      return {
        ...state,
        id: action.user.id,
        firstName: action.user.firstName,
        lastName: action.user.lastName,
        username: action.user.username,
        email: action.user.email,
        role: action.user.roles[0].name,
        roleId: action.user.roles[0].id,
      };
    default:
      return state;
  }
};

const profile = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case t.EDIT_PROFILE_SUCCESS:
      return {
        ...state,
        id: action.payload.id,
        email: action.payload.email,
        firstName: action.payload.firstName,
        lastName: action.payload.lastName,
        username: action.payload.username,
        profileImage: action.payload.profileImage,
        socialMedia: action.payload.socialMedia,
        location: action.payload.location,
        website: action.payload.website,
        bio: action.payload.bio,
      };
    default:
      return state;
  }
};

const usersReducer = combineReducers({
  me,
  profile,
  isFetching,
});

export default usersReducer;
