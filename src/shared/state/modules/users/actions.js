import { push } from 'react-router-redux';
import Axios from 'axios';
import { setToken, removeToken } from '../../../core/authentication/token';
import * as notif from '../../../core/constants';
import { notificationSend } from '../notifications/notifications';
import * as t from '../actionTypes';

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
    return Axios.post('/api/v1/tokens/forgot-password', { data: email })
      .then(res => {
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
        }));
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
    return Axios.post(`/api/v1/tokens/reset-password/${token}`, { data: password })
      .then(res => {
        dispatch({
          type: t.RESET_PASSWORD_SUCCESS,
        });
        push('/account/login');
        dispatch(notificationSend(notif.MSG_RESET_PW_SUCCESS));
      })
      .catch(err =>
        dispatch({
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
  return dispatch => {
    dispatch({
      type: t.VERIFY_ACCOUNT_REQUEST,
    });
    return Axios.get(`/auth/verification/${token}`)
      .then(res => {
        push('/account/login');
        dispatch({
          type: t.VERIFY_ACCOUNT_SUCCESS,
        });
        dispatch(notificationSend(notif.MSG_VERIFY_USER_SUCCESS));
      })
      .catch(err =>
        dispatch({
          type: t.VERIFY_ACCOUNT_FAILURE,
          error: err,
        }));
  };
}

/**
  * PROFILE ACTIONS
  * -------------------------
  * @exports fetchProfile
  * @exports editProfile
  *****************************************************************/

export const fetchProfile = (username: string, axios: any): ThunkAction =>
  (dispatch: Dispatch) => {
    dispatch({
      type: t.FETCH_PROFILE_REQUEST,
      username,
    });

    return axios
      .get(`/api/v1/users/${username}/profile`)
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
export const fetchProfileIfNeeded = (username: string): ThunkAction =>
    (dispatch: Dispatch, getState: GetState, axios: any) => {
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
  if (process.env.NODE_ENV === 'development') return true;

  const theProfile = state.users.profile[username];

  if (theProfile && state.users.isFetching) return false;

  return true;
};
export function editProfile(userData) {
  return dispatch => {
    dispatch(beginUpdateProfile());
    return Axios.put(`/api/v1/users/${userData.id}`, userData)
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
