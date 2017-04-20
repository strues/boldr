import { push } from 'react-router-redux';
import api from '../../../core/api';
import { setToken, removeToken } from '../../../core/authentication/token';
import * as notif from '../../../core/constants';
import { notificationSend } from '../notifications/notifications';
import * as t from './constants';

const API_PREFIX = '/api/v1';
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
    return api
      .post(`${API_PREFIX}/tokens/forgot-password`, { email })
      .then(res => {
        if (res.status !== 202) {
          const err = JSON.stringify(res.data.message.message);
          dispatch({
            type: t.FORGOT_PASSWORD_FAILURE,
            error: err,
          });
          return dispatch(notificationSend(notif.MSG_FORGOT_PW_ERROR));
        }
        dispatch({
          type: t.FORGOT_PASSWORD_SUCCESS,
        });
        dispatch(push('/'));
        dispatch(notificationSend(notif.MSG_FORGOT_PW_ERROR));
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
    return api
      .post(`${API_PREFIX}/tokens/reset-password/${token}`, {
        password,
        token,
      })
      .then(res => {
        if (res.status !== 204) {
          return dispatch({
            type: t.RESET_PASSWORD_FAILURE,
            error: res.data.message,
          });
        }
        dispatch({
          type: t.RESET_PASSWORD_SUCCESS,
        });
        dispatch(push('/account/login'));
        dispatch(notificationSend(notif.MSG_RESET_PW_SUCCESS));
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
    return api
      .post(`${API_PREFIX}/auth/verify`, { token })
      .then(res => {
        dispatch(push('/account/login'));
        dispatch({
          type: t.VERIFY_ACCOUNT_SUCCESS,
        });
        dispatch(notificationSend(notif.MSG_VERIFY_USER_SUCCESS));
      })
      .catch(err =>
        dispatch({
          type: t.VERIFY_ACCOUNT_FAILURE,
          error: err,
        }),
      );
  };
}

/**
  * PROFILE ACTIONS
  * -------------------------
  * @exports fetchProfile
  * @exports editProfile
  *****************************************************************/

export const fetchProfile = (username: string, axios: any): ThunkAction => (
  dispatch: Dispatch,
) => {
  dispatch({
    type: t.FETCH_PROFILE_REQUEST,
    username,
  });

  return axios
    .get(`${API_PREFIX}/users/${username}/profile`)
    .then(res => {
      dispatch({
        type: t.FETCH_PROFILE_SUCCESS,
        payload: res.data,
      });
    })
    .catch(err => {
      dispatch({
        type: t.FETCH_PROFILE_FAILURE,
        error: err,
      });
    });
};
export const fetchProfileIfNeeded = (username: string): ThunkAction => (
  dispatch: Dispatch,
  getState: GetState,
  axios: any,
) => {
  /* istanbul ignore next */
  if (shouldFetchProfile(getState(), username)) {
    /* istanbul ignore next */
    return dispatch(fetchProfile(username, axios));
  }

  /* istanbul ignore next */
  return null;
};
/* istanbul ignore next */
const shouldFetchProfile = (state: Reducer, username: string): boolean => {
  // In development, we want to allow dispatching actions from here
  // or the hot reloading of reducers wont update the component state
  if (process.env.NODE_ENV === 'development') {
    return true;
  }

  const theProfile = state.users.profile[username];

  if (theProfile && state.users.isFetching) {
    return false;
  }

  return true;
};
export function editProfile(userData) {
  return dispatch => {
    dispatch(beginUpdateProfile());
    return api
      .put(`${API_PREFIX}/users/${userData.id}`, userData)
      .then(res => {
        dispatch(doneUpdateProfile(res));
        dispatch(notificationSend(notif.MSG_EDIT_PROFILE_SUCCESS));
      })
      .catch(err => {
        dispatch(failUpdateProfile(err.message));
        dispatch(notificationSend(notif.MSG_EDIT_PROFILE_FAILURE));
      });
  };
}

const beginUpdateProfile = () => {
  return { type: t.EDIT_PROFILE_REQUEST };
};

const doneUpdateProfile = res => {
  return {
    type: t.EDIT_PROFILE_SUCCESS,
    payload: res.data,
  };
};

const failUpdateProfile = err => {
  return {
    type: t.EDIT_PROFILE_FAILURE,
    error: err,
  };
};
