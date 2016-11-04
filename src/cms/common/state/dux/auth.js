import { push } from 'react-router-redux';
import * as api from 'core/services/api';
import { TOKEN_KEY } from 'core/config';
import * as notif from 'core/config/notifications';
import { notificationSend } from './notifications';

export const LOGIN_REQUEST = 'AUTH/LOGIN_REQUEST';
export const LOGIN_SUCCESS = 'AUTH/LOGIN_SUCCESS';
export const LOGIN_FAILURE = 'AUTH/LOGIN_FAILURE';
export const LOGOUT_USER = 'AUTH/LOGOUT_USER';
export const LOGOUT_USER_FAIL = 'AUTH/LOGOUT_USER_FAIL';
export const CHECK_AUTH_REQUEST = 'AUTH/CHECK_AUTH_REQUEST';
export const CHECK_AUTH_SUCCESS = 'AUTH/CHECK_AUTH_SUCCESS';
export const CHECK_AUTH_FAILURE = 'AUTH/CHECK_AUTH_FAILURE';
export const CREATE_ACCOUNT_REQUEST = 'AUTH/CREATE_ACCOUNT_REQUEST';
export const CREATE_ACCOUNT_SUCCESS = 'AUTH/CREATE_ACCOUNT_SUCCESS';
export const CREATE_ACCOUNT_FAILURE = 'AUTH/CREATE_ACCOUNT_FAILURE';
export const FORGOT_PASSWORD_REQUEST = 'AUTH/FORGOT_PASSWORD_REQUEST';
export const FORGOT_PASSWORD_SUCCESS = 'AUTH/FORGOT_PASSWORD_SUCCESS';
export const FORGOT_PASSWORD_FAILURE = 'AUTH/FORGOT_PASSWORD_FAILURE';
export const RESET_PASSWORD_REQUEST = 'AUTH/RESET_PASSWORD_REQUEST';
export const RESET_PASSWORD_SUCCESS = 'AUTH/RESET_PASSWORD_SUCCESS';
export const RESET_PASSWORD_FAILURE = 'AUTH/RESET_PASSWORD_FAILURE';

/**
  * SIGNUP ACTIONS
  * -------------------------
  * @exports signup
  *****************************************************************/

export function signup(data) {
  return (dispatch) => {
    dispatch(beginSignUp());

    return api.doSignup(data)
      .then(response => {
        if (!response.status === 201) {
          dispatch(signUpError('Oops! Something went wrong'));
          dispatch(notificationSend(notif.MSG_SIGNUP_ERROR));
        }
        dispatch(signUpSuccess(response));
        dispatch(push('/'));
        dispatch(notificationSend(notif.MSG_SIGNUP_SUCCESS));
      });
  };
}

const beginSignUp = () => {
  return { type: CREATE_ACCOUNT_REQUEST };
};

// Signup Success
const signUpSuccess = (response) => {
  return {
    type: CREATE_ACCOUNT_SUCCESS,
    payload: response,
  };
};

// Signup Error
const signUpError = (err) => {
  return {
    type: CREATE_ACCOUNT_FAILURE,
    error: err,
  };
};

/**
  * LOGIN ACTIONS
  * -------------------------
  * @exports login
  *****************************************************************/

export function login(loginData, redir) {
  return (dispatch) => {
    dispatch(beginLogin());
    return api.doLogin(loginData)
      .then(response => {
        if (response.status !== 200) {
          dispatch(loginError());
          dispatch(notificationSend(notif.MSG_LOGIN_ERROR('Unable to login')));
        }
        localStorage.setItem(TOKEN_KEY, response.body.token);
        dispatch(loginSuccess(response));
        dispatch(notificationSend(notif.MSG_LOGIN_SUCCESS));
        dispatch(push('/'));
      });
  };
}
const beginLogin = () => {
  return { type: LOGIN_REQUEST };
};

function loginSuccess(response) {
  return {
    type: LOGIN_SUCCESS,
    token: response.body.token,
    user: response.body.user,
  };
}

function loginError(err) {
  return {
    type: LOGIN_FAILURE,
    error: err,
  };
}

/**
  * LOGOUT ACTIONS
  * -------------------------
  * @exports logout
  *****************************************************************/
function logoutSuccess() {
  return { type: LOGOUT_USER };
}

export function logout() {
  return (dispatch) => {
    localStorage.removeItem(TOKEN_KEY);
    dispatch(logoutSuccess());
    dispatch(notificationSend(notif.MSG_LOGOUT));
  };
}

/**
  * AUTH CHECK ACTIONS
  * -------------------------
  * @exports checkAuth
  *****************************************************************/

export function checkAuth(token) {
  return (dispatch) => {
    dispatch(checkAuthRequest());
    return api.doAuthCheck(token)
      .then(response => {
        if (response.status !== 200) {
          dispatch(checkAuthFailure('Token is invalid'));
          dispatch(notificationSend(notif.MSG_AUTH_ERROR));
        }
        dispatch(checkAuthSuccess(response, token));
      });
  };
}

function checkAuthRequest() {
  return { type: CHECK_AUTH_REQUEST };
}

function checkAuthSuccess(response, token) {
  return {
    type: CHECK_AUTH_SUCCESS,
    token: token, // eslint-disable-line
    user: response.body.user,
  };
}

function checkAuthFailure(error) {
  return {
    type: CHECK_AUTH_FAILURE,
    payload: error,
  };
}

// Forgot Password
// -----------------
export function forgotPassword(email) {
  return (dispatch) => {
    dispatch({
      type: FORGOT_PASSWORD_REQUEST,
    });
    return api.doForgotPassword(email)
      .then((response) => {
        if (response.ok) {
          return response.json().then((json) => {
            dispatch({
              type: FORGOT_PASSWORD_SUCCESS,
            });
            dispatch(push('/'));
            dispatch(notificationSend(notif.MSG_FORGOT_PW_ERROR));
          });
        } else {
          return response.json().then((json) => {
            dispatch({
              type: FORGOT_PASSWORD_FAILURE,
              error: Array.isArray(json) ? json : [json],
            });
          });
        }
      });
  };
}

// Reset Password
// -----------------
export function resetPassword(password, token) {
  return (dispatch) => {
    dispatch({
      type: RESET_PASSWORD_REQUEST,
    });
    return api.doResetPassword(password, token)
      .then((response) => {
        if (response.ok) {
          return response.json().then((json) => {
            push('/login');
            dispatch({
              type: RESET_PASSWORD_SUCCESS,
            });
            dispatch(push('/'));
            dispatch(notificationSend(notif.MSG_RESET_PW_SUCCESS));
          });
        } else {
          return response.json().then((json) => {
            dispatch({
              type: RESET_PASSWORD_FAILURE,
              error: Array.isArray(json) ? json : [json],
            });
          });
        }
      });
  };
}

/**
 * INITIAL STATE
 */
const INITIAL_STATE = {
  isAuthenticated: false,
  error: null,
  loading: false,
  token: null,
  hydrated: false,
  user: {},
};

/**
 * Auth Reducer
 * @param  {Object} state       The initial state
 * @param  {Object} action      The action object
 */
export default function authReducer(state = INITIAL_STATE, action = {}) {
  if (!state.hydrated) {
    state = Object.assign({}, INITIAL_STATE, state, { hydrated: true });
  }
  switch (action.type) {
    case LOGIN_FAILURE:
    case FORGOT_PASSWORD_FAILURE:
    case CREATE_ACCOUNT_FAILURE:
    case RESET_PASSWORD_FAILURE:
      return {
        ...state,
        loading: false,
        isAuthenticated: false,
        error: action.error,
      };
    case LOGIN_REQUEST:
    case CHECK_AUTH_REQUEST:
    case CREATE_ACCOUNT_REQUEST:
    case FORGOT_PASSWORD_REQUEST:
    case RESET_PASSWORD_REQUEST:
      return {
        ...state,
        loading: true,
        isAuthenticated: false,
      };
    case LOGIN_SUCCESS:
    case CHECK_AUTH_SUCCESS:
      return {
        ...state,
        loading: false,
        isAuthenticated: true,
        token: action.token,
        user: action.user,
      };
    case LOGOUT_USER:
      return {
        ...state,
        loading: false,
        isAuthenticated: false,
        token: '',
        user: '',
      };
    case CREATE_ACCOUNT_SUCCESS:
      return {
        ...state,
        loading: false,
      };
    case RESET_PASSWORD_SUCCESS:
      return {
        ...state,
        loading: false,
      };
    case FORGOT_PASSWORD_SUCCESS:
      return {
        ...state,
        loading: false,
      };
    default:
      return state;
  }
}
