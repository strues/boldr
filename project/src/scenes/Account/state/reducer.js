/* eslint-disable complexity */
// @flow
import type { AuthState } from '../../../types/state';
import * as t from './actionTypes';

/**
 * INITIAL STATE
 */
const INITIAL_STATE = {
  isAuthenticated: false,
  error: null,
  loading: false,
  token: null,
  info: null,
};

/**
 * Auth Reducer
 * @param  {Object} state       The initial state
 * @param  {Object} action      The action object
 */
// $FlowIssue
function authReducer(state: AuthState = INITIAL_STATE, action = {}) {
  switch (action.type) {
    case t.LOGIN_FAILURE:
    case t.SIGNUP_USER_FAILURE:
    case t.CHECK_AUTH_FAILURE:
      return {
        ...state,
        loading: false,
        isAuthenticated: false,
        token: '',
        error: action.error,
      };
    case t.LOGIN_REQUEST:
    case t.CHECK_AUTH_REQUEST:
    case t.SIGNUP_USER_REQUEST:
      return {
        ...state,
        loading: true,
        isAuthenticated: false,
      };
    case t.LOGIN_SUCCESS:
      return {
        ...state,
        loading: false,
        isAuthenticated: true,
        token: action.token,
        info: action.info,
      };
    case t.CHECK_AUTH_SUCCESS:
      return {
        ...state,
        loading: false,
        isAuthenticated: true,
        token: action.token,
        info: {
          id: action.account.id,
          email: action.account.email,
          firstName: action.account.profile.firstName,
          lastName: action.account.profile.lastName,
          username: action.account.profile.username,
          avatarUrl: action.account.profile.avatarUrl,
          profileImage: action.account.profile.profileImage,
          location: action.account.profile.location,
          bio: action.account.profile.bio,
          website: action.account.profile.website,
          socialMedia: action.account.profile.socialMedia,
          role: action.account.roles[0].name,
          roleId: action.account.roles[0].id,
        },
      };
    case t.LOGOUT:
      return {
        loading: false,
        error: null,
        isAuthenticated: false,
        token: '',
        info: {
          firstName: '',
          lastName: '',
          email: '',
          username: '',
          avatarUrl: '',
          role: '',
          roleId: null,
        },
      };
    case t.SIGNUP_USER_SUCCESS:
      return {
        ...state,
        loading: false,
      };
    default:
      return state;
  }
}

export default authReducer;
