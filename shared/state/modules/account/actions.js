import { push } from 'react-router-redux';
import * as api from '../../../core/api';
import { setToken, removeToken } from '../../../core/services/token';
import * as notif from '../../../core/constants';
import { notificationSend } from '../notifications/notifications';
import * as t from './constants';

/**
  * SIGNUP ACTIONS
  * -------------------------
  * @exports signup
  *****************************************************************/

export function doSignup(data) {
  return (dispatch) => {
    dispatch(beginSignUp());
    return api.doSignup(data)
      .then(response => {
        if (!response.status === 201) {
          dispatch(signUpError(response));
          dispatch(notificationSend(notif.MSG_SIGNUP_ERROR));
        }
        dispatch(signUpSuccess());
        dispatch(push('/'));
        dispatch(notificationSend(notif.MSG_SIGNUP_SUCCESS));
      });
  };
}

const beginSignUp = () => {
  return { type: t.SIGNUP_USER_REQUEST };
};

// Signup Success
const signUpSuccess = () => {
  return {
    type: t.SIGNUP_USER_SUCCESS,
  };
};

// Signup Error
const signUpError = (err) => {
  return {
    type: t.SIGNUP_USER_FAILURE,
    error: err,
  };
};

/**
  * LOGIN ACTIONS
  * -------------------------
  * @exports login
  *****************************************************************/

export function doLogin(data) {
  return (dispatch) => {
    dispatch(beginLogin());
    return api.doLogin(data)
      .then(response => {
        if (response.status !== 200) {
          dispatch(loginError(response));
          dispatch(notificationSend(notif.MSG_LOGIN_ERROR('Unable to login')));
        }
        setToken(response.body.token);
        dispatch(loginSuccess(response));
        dispatch(notificationSend(notif.MSG_LOGIN_SUCCESS));
        dispatch(push('/'));
      })
      .catch(err => {
        dispatch(loginError(err));
        dispatch(notificationSend({
          message: err.error.message, kind: 'error', dismissAfter: 3000,
        }));
      });
  };
}
const beginLogin = () => {
  return { type: t.LOGIN_REQUEST };
};

function loginSuccess(response) {
  return {
    type: t.LOGIN_SUCCESS,
    token: response.body.token,
    user: response.body.user,
  };
}

function loginError(err) {
  return {
    type: t.LOGIN_FAILURE,
    error: err.error.message,
  };
}

/**
  * LOGOUT ACTIONS
  * -------------------------
  * @exports logout
  *****************************************************************/
function logoutSuccess() {
  return { type: t.LOGOUT_USER };
}

export function logout() {
  return (dispatch) => {
    removeToken();
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
  return { type: t.CHECK_AUTH_REQUEST };
}

function checkAuthSuccess(response, token) {
  return {
    type: t.CHECK_AUTH_SUCCESS,
    token: token, // eslint-disable-line
    user: response.body,
  };
}

function checkAuthFailure(error) {
  return {
    type: t.CHECK_AUTH_FAILURE,
    payload: error,
  };
}

/**
  * FORGOT PASSWORD ACTIONS
  * -------------------------
  * @exports forgotPassword
  *****************************************************************/

export function forgotPassword(email) {
  return (dispatch) => {
    dispatch({
      type: t.FORGOT_PASSWORD_REQUEST,
    });
    return api.doForgotPassword(email)
      .then(response => {
        dispatch({
          type: t.FORGOT_PASSWORD_SUCCESS,
        });
        dispatch(push('/'));
        dispatch(notificationSend(notif.MSG_FORGOT_PW_ERROR));
      }).catch(err => dispatch({
        type: t.FORGOT_PASSWORD_FAILURE,
        error: err,
      }));
  };
}

/**
  * RESET PASSWORD ACTIONS
  * -------------------------
  * @exports resetPassword
  *****************************************************************/

export function resetPassword(password, token) {
  return (dispatch) => {
    dispatch({
      type: t.RESET_PASSWORD_REQUEST,
    });
    return api.doResetPassword(password, token)
      .then(response => {
        dispatch({
          type: t.RESET_PASSWORD_SUCCESS,
        });
        push('/login');
        dispatch(notificationSend(notif.MSG_RESET_PW_SUCCESS));
      }).catch(err => dispatch({
        type: t.RESET_PASSWORD_FAILURE,
        error: err,
      }));
  };
}

/**
  * VERIFY ACCOUNT ACTIONS
  * -------------------------
  * @exports verifyAccount
  *****************************************************************/

export function verifyAccount(token) {
  return (dispatch) => {
    dispatch({
      type: t.VERIFY_ACCOUNT_REQUEST,
    });
    return api.doVerifyAccount(token)
      .then(response => {
        push('/login');
        dispatch({
          type: t.VERIFY_ACCOUNT_SUCCESS,
        });
        dispatch(push('/'));
        dispatch(notificationSend(notif.MSG_VERIFY_USER_SUCCESS));
      }).catch(err => dispatch({
        type: t.VERIFY_ACCOUNT_FAILURE,
        error: err,
      }));
  };
}
