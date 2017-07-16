import { replacePath } from '../../core/RouterConnection';
import { API_PREFIX } from '../../core';
import * as notif from '../../core/constants';
import { sendNotification } from '../notifications/notifications';
import * as t from './actionTypes';

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
    return fetch(`${API_PREFIX}/tokens/forgot-password`, {
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
        dispatch(replacePath('/'));
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
    return fetch(`${API_PREFIX}/tokens/reset-password/${token}`, {
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
        dispatch(replacePath('/login'));
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
    return fetch(`${API_PREFIX}/auth/verify`, {
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
      .then(res => {
        dispatch(replacePath('/login'));
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

export function editProfile(userData) {
  return dispatch => {
    dispatch(beginUpdateProfile());
    return fetch(`${API_PREFIX}/users/${userData.id}`, {
      method: 'PUT',
      headers: {
        Accept: 'application/json, text/plain, */*',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        userData,
      }),
    })
      .then(response => {
        return response.json();
      })
      .then(res => {
        dispatch(doneUpdateProfile(res));
        return dispatch(sendNotification(notif.MSG_EDIT_PROFILE_SUCCESS));
      })
      .catch(err => {
        dispatch(failUpdateProfile(err.message));
        dispatch(sendNotification(notif.MSG_EDIT_PROFILE_FAILURE));
      });
  };
}

const beginUpdateProfile = () => {
  return { type: t.EDIT_PROFILE_REQUEST };
};

const doneUpdateProfile = res => {
  return {
    type: t.EDIT_PROFILE_SUCCESS,
    payload: res,
  };
};

const failUpdateProfile = err => {
  return {
    type: t.EDIT_PROFILE_FAILURE,
    error: err,
  };
};

export function setUserLoggedIn(loginUser) {
  return {
    type: t.SET_USER_LOGGED_IN,
    user: loginUser.user,
  };
}
