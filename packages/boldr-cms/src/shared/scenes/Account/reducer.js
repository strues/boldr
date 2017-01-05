import { combineReducers } from 'redux';
import * as t from './constants';

export const STATE_KEY = 'account';
export const AUTH_STATE_KEY = 'auth';
export const USER_STATE_KEY = 'user';

/**
 * INITIAL STATE
 */
const INITIAL_STATE = {
  isAuthenticated: false,
  error: null,
  loading: false,
  token: null,
};

/**
 * Auth Reducer
 * @param  {Object} state       The initial state
 * @param  {Object} action      The action object
 */
function authReducer(state = INITIAL_STATE, action = {}) {
  switch (action.type) {
    case t.LOGIN_FAILURE:
    case t.FORGOT_PASSWORD_FAILURE:
    case t.SIGNUP_USER_FAILURE:
    case t.RESET_PASSWORD_FAILURE:
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
    case t.FORGOT_PASSWORD_REQUEST:
    case t.RESET_PASSWORD_REQUEST:
      return {
        ...state,
        loading: true,
        isAuthenticated: false,
      };
    case t.LOGIN_SUCCESS:
    case t.CHECK_AUTH_SUCCESS:
      return {
        ...state,
        loading: false,
        isAuthenticated: true,
        token: action.token,
      };
    case t.LOGOUT_USER:
      return {
        ...state,
        loading: false,
        isAuthenticated: false,
        token: '',
      };

    case t.RESET_PASSWORD_SUCCESS:
    case t.FORGOT_PASSWORD_SUCCESS:
    case t.SIGNUP_USER_SUCCESS:
      return {
        ...state,
        loading: false,
      };
    default:
      return state;
  }
}

const INITIAL_USER_STATE = {
  email: '',
  firstName: '',
  lastName: '',
  displayName: '',
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
        displayName: action.user.display_name,
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
        displayName: '',
        avatarUrl: '',
        role: '',
        roleId: '',
      };
    default:
      return state;
  }
}

const accountReducer = combineReducers({
  [AUTH_STATE_KEY]: authReducer,
  [USER_STATE_KEY]: userReducer,
});

export default accountReducer;
