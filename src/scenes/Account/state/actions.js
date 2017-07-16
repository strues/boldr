/* @flow */
import { replacePath } from '../../../core/RouterConnection';
import { API_PREFIX, setToken, removeToken } from '../../../core';
import * as notif from '../../../core/constants';
import { sendNotification, showNotification } from '../../../state/notifications/notifications';
import { setUserLoggedIn } from '../../../state/users/actions';
import LOGIN_MUTATION from '../gql/login.mutation.graphql';
import SIGNUP_MUTATION from '../gql/signup.mutation.graphql';
import apolloClient from '../../../core/createApolloClient';
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

const signupUserMutation = opts =>
  apolloClient.mutate({
    mutation: SIGNUP_MUTATION,
    ...opts,
  });
/**
 * @name doSignup
 * thunk action sending data to login a user
 * @param  {String} token the JWT returned on a successful login
 */
export function doSignup(formInput) {
  return dispatch => {
    signupUserMutation({
      variables: {
        input: {
          email: formInput.email,
          password: formInput.password,
          firstName: formInput.firstName,
          lastName: formInput.lastName,
          username: formInput.username,
        },
      },
    })
      .then(res => {
        if (res.data.signupUser.errors) {
          dispatch(
            showNotification({
              text: res.data.signupUser.errors[0].value,
              type: 'error',
            }),
          );
          dispatch(
            signupUserError({
              error: res.data.signupUser.errors,
            }),
          );
        }
        dispatch(signupUserSuccess(res.data.signupUser));
        dispatch(
          showNotification({
            text: 'Account created!',
            type: 'success',
          }),
        );
        return dispatch(replacePath('/'));
      })
      .catch(error => {
        dispatch(
          signupUserError({
            error,
          }),
        );
      });
  };
}

const loginUserMutation = opts =>
  apolloClient.mutate({
    mutation: LOGIN_MUTATION,
    ...opts,
  });
/**
 * @name doLogin
 * thunk action sending data to login a user
 * @param  {String} token the JWT returned on a successful login
 */
export function doLogin(formInput) {
  return dispatch => {
    loginUserMutation({
      variables: {
        input: {
          email: formInput.email,
          password: formInput.password,
        },
      },
    })
      .then(res => {
        if (!res.data.loginUser.token) {
          dispatch(
            sendNotification({
              message: res.data.loginUser.errors[0].value,
              kind: 'error',
              dismissAfter: 3000,
            }),
          );
          return dispatch(
            loginUserError({
              error: res.data.loginUser.errors,
            }),
          );
        }
        const { loginUser } = res.data;
        setToken(loginUser.token);
        dispatch(loginUserSuccess(loginUser));
        dispatch(setUserLoggedIn(loginUser));
        dispatch(
          showNotification({
            text: 'Welcome back!',
            type: 'success',
          }),
        );
        return dispatch(replacePath('/'));
      })
      .catch(() => {
        dispatch(
          loginUserError({
            error: res.data.loginUser.errors,
          }),
        );
      });
  };
}

export function loginUserSuccess(loginUser) {
  return {
    type: t.LOGIN_SUCCESS,
    token: loginUser.token,
    info: {
      firstName: loginUser.user.firstName,
      lastName: loginUser.user.lastName,
      email: loginUser.user.email,
      username: loginUser.user.username,
      avatarUrl: loginUser.user.avatarUrl,
      role: loginUser.user.roles[0].name,
      roleId: loginUser.user.roles[0].id,
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
  return (dispatch: Function): void => {
    removeToken();
    dispatch({
      type: t.LOGOUT,
    });
    dispatch(showNotification({ type: 'success', text: 'Logged out.' }));
  };
}

/**
  * AUTH CHECK ACTIONS
  * -------------------------
  * @exports checkAuth
  *****************************************************************/

export const checkAuth = (token: string) => {
  return (dispatch: Function) => {
    dispatch({ type: t.CHECK_AUTH_REQUEST });
    return fetch(`${API_PREFIX}/auth/check`, {
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
        const user = res;
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
