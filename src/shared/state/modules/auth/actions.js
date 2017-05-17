import { push } from 'react-router-redux';
import { api, API_PREFIX, setToken, removeToken } from '../../../core';
import * as notif from '../../../core/constants';
import { sendNotification } from '../notifications/notifications';
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

// Signup Error
const signUpError = err => {
  return {
    type: t.SIGNUP_USER_FAILURE,
    error: err,
  };
};

/**
 * @name doLogin
 * thunk action sending data to login a user
 * @param  {Object} formInput contains email & password from the userLoginForm
 */
export function doLogin(formInput: userLoginFormInput) {
  return dispatch => {
    dispatch({ type: t.LOGIN_REQUEST });
    return api
      .post(`${API_PREFIX}/auth/login`, formInput)
      .then(res => {
        if (res.status !== 200) {
          const errMsg = JSON.stringify(res.data.message.message);
          dispatch({
            type: t.LOGIN_FAILURE,
            error: errMsg,
          });
          return dispatch(
            sendNotification({
              message: 'There was a problem logging you in.',
              kind: 'error',
              dismissAfter: 3000,
            }),
          );
        }
        setToken(res.data.token);
        dispatch({
          type: t.LOGIN_SUCCESS,
          token: res.data.token,
          user: res.data.user,
        });
        dispatch(sendNotification(notif.MSG_LOGIN_SUCCESS));
        return dispatch(push('/'));
      })
      .catch(err => {
        dispatch({
          type: t.LOGIN_FAILURE,
          error: err,
        });
        return dispatch(
          sendNotification({
            message: err,
            kind: 'error',
            dismissAfter: 3000,
          }),
        );
      });
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
    dispatch(sendNotification(notif.MSG_LOGOUT));
  };
}

/**
  * AUTH CHECK ACTIONS
  * -------------------------
  * @exports checkAuth
  *****************************************************************/

export const checkAuth = token => {
  return async (dispatch: Function) => {
    dispatch({ type: t.CHECK_AUTH_REQUEST });
    try {
      const res = await api.get(`${API_PREFIX}/auth/check`);
      const user = res.data;
      dispatch({
        type: t.CHECK_AUTH_SUCCESS,
        user,
        token,
      });
    } catch (err) {
      removeToken();
      dispatch({
        type: t.CHECK_AUTH_FAILURE,
        err,
      });
      return dispatch(sendNotification(notif.MSG_AUTH_ERROR));
    }
  };
};
