import { combineReducers } from 'redux';
import * as t from './constants';

export const STATE_KEY = 'auth';

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
    case t.SIGNUP_USER_FAILURE:
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
    case t.CHECK_AUTH_SUCCESS:
      return {
        ...state,
        loading: false,
        isAuthenticated: true,
        token: action.token,
      };
    case t.LOGOUT:
      return {
        ...state,
        loading: false,
        isAuthenticated: false,
        token: '',
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
