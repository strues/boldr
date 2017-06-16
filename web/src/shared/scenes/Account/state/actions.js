/* @flow */
import { push } from 'react-router-redux';
import { api, API_PREFIX, setToken, removeToken } from '../../../core';
import * as notif from '../../../core/constants';
import { sendNotification } from '../../../state/modules/notifications/notifications';
import * as t from './actionTypes';

/**
 * @name doSignup
 * thunk action sending data to create a user to the api
 * @param  {Object} formInput contains firstName, lastName, email, password,
 *                            & username from the userSignupForm
 */
export function doSignup(formInput: userSignupFormInput) {
  return dispatch => {
    dispatch({ type: t.SIGNUP_USER_REQUEST });
    return api
      .post(`${API_PREFIX}/auth/signup`, formInput)
      .then(res => {
        if (res.status !== 201) {
          const err = JSON.stringify(res.data.message.message);
          dispatch(signUpError(err));
          dispatch(notificationSend(notif.MSG_SIGNUP_ERROR));
        }
        dispatch({ type: t.SIGNUP_USER_SUCCESS });
        dispatch(push('/'));
        return dispatch(notificationSend(notif.MSG_SIGNUP_SUCCESS));
      })
      .catch(err => {
        dispatch(sendNotification(notif.MSG_SIGNUP_ERROR));
        return dispatch(signUpError(err));
      });
  };
}

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
 * @name doLogin
 * thunk action sending data to login a user
 * @param  {Object} formInput contains email & password from the userLoginForm
 */

export const doLogin = token => {
  console.log(token);
  setToken(token);
  dispatch({
    type: t.LOGIN_SUCCESS,
    token,
  });
  dispatch(sendNotification(notif.MSG_LOGIN_SUCCESS));
  return dispatch(push('/'));
};

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
    dispatch(sendNotification(notif.MSG_LOGOUT));
  };
}
export const loginUserRequest = ({ username }) => ({
  type: t.LOGIN_REQUEST,
  username,
});

export function loginUserSuccess(loginUser) {
  return {
    type: t.LOGIN_SUCCESS,
    token: loginUser.token,
  };
}

export const loginUserError = ({ error }) => ({
  type: t.LOGIN_FAILURE,
  error,
});
/**
  * AUTH CHECK ACTIONS
  * -------------------------
  * @exports checkAuth
  *****************************************************************/

export const checkAuth = token => {
  return (dispatch: Function) => {
    dispatch({ type: t.CHECK_AUTH_REQUEST });
    return api
      .get(`${API_PREFIX}/auth/check`)
      .then(res => {
        const user = res.data;
        return dispatch({
          type: t.CHECK_AUTH_SUCCESS,
          user,
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
