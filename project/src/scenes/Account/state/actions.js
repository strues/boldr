import { setToken, removeToken, sendNotification } from '@boldr/core';
import { push } from 'react-router-redux';
import * as notif from '../../../core/constants';

import * as t from './actionTypes';

export function signupUserSuccess() {
  return {
    type: t.SIGNUP_USER_SUCCESS,
  };
}

export const signupUserError = ({ error }) => ({
  type: t.SIGNUP_USER_FAILURE,
  error,
});

/**
 * @name doSignup
 * thunk action sending data to login a user
 * @param  {String} token the JWT returned on a successful login
 */
export function doSignup(signupUser) {
  return dispatch => {
    dispatch(signupUserSuccess(signupUser));
    dispatch(
      sendNotification({
        text: 'Account created!',
        type: 'success',
      }),
    );
    return dispatch(push('/'));
  };
}

/**
 * @name doLogin
 * thunk action sending data to login a user
 * @param  {String} token the JWT returned on a successful login
 */
export function doLogin(loginAccount) {
  return dispatch => {
    setToken(loginAccount.token);
    dispatch(loginUserSuccess(loginAccount));
    dispatch(setUserLoggedIn(loginAccount));
    dispatch(
      sendNotification({
        text: 'Welcome back!',
        type: 'success',
      }),
    );
    return dispatch(push('/'));
  };
}

export function loginUserSuccess(loginAccount) {
  return {
    type: t.LOGIN_SUCCESS,
    token: loginAccount.token,
    info: {
      firstName: loginAccount.account.profile.firstName,
      lastName: loginAccount.account.profile.lastName,
      email: loginAccount.account.email,
      username: loginAccount.account.profile.username,
      avatarUrl: loginAccount.account.profile.avatarUrl,
      role: loginAccount.account.roles[0].name,
      roleId: loginAccount.account.roles[0].id,
    },
  };
}

export const loginUserError = ({ error }) => ({
  type: t.LOGIN_FAILURE,
  error,
});

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
    dispatch(sendNotification({ type: 'success', text: 'Logged out.' }));
  };
}

/**
  * AUTH CHECK ACTIONS
  * -------------------------
  * @exports checkAuth
  *****************************************************************/

export const checkAuth = token => {
  return dispatch => {
    dispatch({ type: t.CHECK_AUTH_REQUEST });
    return fetch(`${process.env.API_URL}${process.env.API_PREFIX}/auth/check`, {
      headers: {
        Accept: 'application/json, text/plain, */*',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    })
      .then(response => {
        return response.json();
      })
      .then(res => {
        return dispatch({
          type: t.CHECK_AUTH_SUCCESS,
          account: res,
          token,
        });
      })
      .catch(err => {
        removeToken();
        dispatch({
          type: t.CHECK_AUTH_FAILURE,
          err,
        });
        return dispatch(sendNotification(notif.MSG_AUTH_ERROR));
      });
  };
};

/**
  * FORGOT PASSWORD ACTIONS
  * -------------------------
  * @exports forgotPassword
  *****************************************************************/

export function forgotPassword(email) {
  return dispatch => {
    dispatch({
      type: t.FORGOT_PASSWORD_REQUEST,
    });
    return fetch(`${process.env.API_URL}${process.env.API_PREFIX}/tokens/forgot-password`, {
      method: 'POST',
      headers: {
        Accept: 'application/json, text/plain, */*',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email }),
    })
      .then(response => {
        return response.json();
      })
      .then(res => {
        if (res.status !== 202) {
          const err = JSON.stringify(res.data.message.message);
          dispatch({
            type: t.FORGOT_PASSWORD_FAILURE,
            error: err,
          });
          return dispatch(sendNotification(notif.MSG_FORGOT_PW_ERROR));
        }
        dispatch({
          type: t.FORGOT_PASSWORD_SUCCESS,
        });
        dispatch(push('/'));
        return dispatch(sendNotification(notif.MSG_FORGOT_PW_ERROR));
      })
      .catch(err =>
        dispatch({
          type: t.FORGOT_PASSWORD_FAILURE,
          error: err,
        }),
      );
  };
}

/**
  * RESET PASSWORD ACTIONS
  * -------------------------
  * @exports resetPassword
  *****************************************************************/

export function resetPassword(password, token) {
  return dispatch => {
    dispatch({
      type: t.RESET_PASSWORD_REQUEST,
    });
    return fetch(`${process.env.API_URL}${process.env.API_PREFIX}/tokens/reset-password/${token}`, {
      method: 'POST',
      headers: {
        Accept: 'application/json, text/plain, */*',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        password,
        token,
      }),
    })
      .then(response => {
        return response.json();
      })
      .then(res => {
        if (res.status !== 204) {
          return dispatch({
            type: t.RESET_PASSWORD_FAILURE,
            error: res.message,
          });
        }
        dispatch({
          type: t.RESET_PASSWORD_SUCCESS,
        });
        dispatch(push('/login'));
        return dispatch(sendNotification(notif.MSG_RESET_PW_SUCCESS));
      })
      .catch(err =>
        dispatch({
          type: t.RESET_PASSWORD_FAILURE,
          error: err,
        }),
      );
  };
}

export function setUserLoggedIn(loginAccount) {
  return {
    type: t.SET_USER_LOGGED_IN,
    user: loginAccount.account,
  };
}

/**
  * VERIFY ACCOUNT ACTIONS
  * -------------------------
  * @exports verifyAccount
  *****************************************************************/

export function verifyAccount(token) {
  return dispatch => {
    dispatch({
      type: t.VERIFY_ACCOUNT_REQUEST,
    });
    return fetch(`${process.env.API_URL}${process.env.API_PREFIX}/auth/verify`, {
      method: 'POST',
      headers: {
        Accept: 'application/json, text/plain, */*',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        token,
      }),
    })
      .then(response => {
        return response.json();
      })
      .then(() => {
        dispatch(push('/login'));
        dispatch({
          type: t.VERIFY_ACCOUNT_SUCCESS,
        });
        return dispatch(sendNotification(notif.MSG_VERIFY_USER_SUCCESS));
      })
      .catch(err =>
        dispatch({
          type: t.VERIFY_ACCOUNT_FAILURE,
          error: err,
        }),
      );
  };
}
