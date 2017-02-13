import { push } from 'react-router-redux';
import * as api from '../../../core/api';
import { setToken, removeToken } from '../../../core/services/token';
import * as notif from '../../../core/constants';
import { notificationSend } from '../notifications/notifications';
import * as t from '../actionTypes';

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

const beginSignUp = () => ({ type: t.SIGNUP_USER_REQUEST });

// Signup Success
const signUpSuccess = () => ({ type: t.SIGNUP_USER_SUCCESS });

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
          message: err, kind: 'error', dismissAfter: 3000,
        }));
      });
  };
}
const beginLogin = () => ({ type: t.LOGIN_REQUEST });

function loginSuccess(response) {
  return {
    type: t.LOGIN_SUCCESS,
    token: response.body.token,
    user: response.body.user,
  };
}

function loginError(err) {
  console.log(err)
  return {
    type: t.LOGIN_FAILURE,
    error: err
  };
}

/**
  * LOGOUT ACTIONS
  * -------------------------
  * @exports logout
  *****************************************************************/

export function logout() {
  return (dispatch) => {
    removeToken();
    dispatch({
      type: t.LOGOUT,
    });
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
