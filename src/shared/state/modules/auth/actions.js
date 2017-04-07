import { push } from 'react-router-redux';
import Axios from 'axios';
import { setToken, removeToken } from '../../../core/authentication/token';
import * as notif from '../../../core/constants';
import { notificationSend } from '../notifications/notifications';
import * as t from '../actionTypes';

/**
  * SIGNUP ACTIONS
  * -------------------------
  * @exports signup
  *****************************************************************/

export function doSignup(data) {
  return dispatch => {
    dispatch(beginSignUp());
    return Axios.post('/api/v1/auth/signup', data).then(res => {
      if (!res.status === 201) {
        dispatch(signUpError(res));
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
const signUpError = err => {
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
  return dispatch => {
    dispatch(beginLogin());
    return Axios.post('/api/v1/auth/login', data)
      .then(res => {
        if (res.status !== 200) {
          dispatch(loginError(res));
          dispatch(notificationSend(notif.MSG_LOGIN_ERROR('Unable to login')));
        }
        setToken(res.data.token);
        dispatch(loginSuccess(res));
        dispatch(notificationSend(notif.MSG_LOGIN_SUCCESS));
        dispatch(push('/'));
      })
      .catch(err => {
        dispatch(loginError(err));
        dispatch(
          notificationSend({
            message: err,
            kind: 'error',
            dismissAfter: 3000,
          }),
        );
      });
  };
}
const beginLogin = () => ({ type: t.LOGIN_REQUEST });

function loginSuccess(res) {
  return {
    type: t.LOGIN_SUCCESS,
    token: res.data.token,
    user: res.data.user,
  };
}

function loginError(err) {
  return {
    type: t.LOGIN_FAILURE,
    error: err,
  };
}

/**
  * LOGOUT ACTIONS
  * -------------------------
  * @exports logout
  *****************************************************************/

export function logout() {
  return dispatch => {
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

export const checkAuth = token => {
  return async (dispatch: Function) => {
    try {
      dispatch(checkAuthRequest());
      const res = await Axios.get('/api/v1/auth/check');
      const user = res.data;
      dispatch(checkAuthSuccess(user, token));
    } catch (err) {
      dispatch(checkAuthFailure('Token is invalid'));
      dispatch(notificationSend(notif.MSG_AUTH_ERROR));
    }
  };
};

function checkAuthRequest() {
  return { type: t.CHECK_AUTH_REQUEST };
}

function checkAuthSuccess(user, token) {
  return {
    type: t.CHECK_AUTH_SUCCESS,
    token: token, // eslint-disable-line
    user,
  };
}

function checkAuthFailure(error) {
  return {
    type: t.CHECK_AUTH_FAILURE,
    payload: error,
  };
}
