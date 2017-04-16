/* @flow */
import type {Store as ReduxStore} from 'redux';

export type ApiAction<T> = {
  key: string,
  payload: T,
};

export type ActionType =
  | 'LOGIN_REQUEST'
  | 'LOGIN_SUCCESS'
  | 'LOGIN_FAILURE'
  | 'LOGOUT_USER'
  | 'LOGOUT_USER_FAIL'
  | 'CHECK_AUTH_REQUEST'
  | 'CHECK_AUTH_SUCCESS'
  | 'CHECK_AUTH_FAILURE'
  | 'SIGNUP_USER_REQUEST'
  | 'SIGNUP_USER_SUCCESS'
  | 'SIGNUP_USER_FAILURE'
  | 'FORGOT_PASSWORD_REQUEST'
  | 'FORGOT_PASSWORD_SUCCESS'
  | 'FORGOT_PASSWORD_FAILURE'
  | 'RESET_PASSWORD_REQUEST'
  | 'RESET_PASSWORD_SUCCESS'
  | 'RESET_PASSWORD_FAILURE'
  | 'LOAD_POSTS_REQUEST'
  | 'LOAD_POSTS_SUCCESS'
  | 'LOAD_POSTS_FAILURE'
  | 'FETCH_POST_REQUEST'
  | 'FETCH_POST_SUCCESS'
  | 'FETCH_POST_FAILURE'
  | 'UPDATE_POST_REQUEST'
  | 'UPDATE_POST_SUCCESS'
  | 'UPDATE_POST_FAILURE'
  | 'SELECT_POST'
  | 'SELECT_POST_SUCCESS'
  | 'SELECT_POST_FAILURE'
  | 'CREATE_POST_REQUEST'
  | 'CREATE_POST_SUCCESS'
  | 'CREATE_POST_FAILURE'
  | 'DELETE_POST_FAILURE'
  | 'DELETE_POST_REQUEST'
  | 'DELETE_POST_SUCCESS';

export type PostsReducer = {
  all: Object,
  ids: Array<Object>,
  isFetching: boolean,
  currentPost: Object,
};

export type BlogReducer = {
  posts: PostsReducer,
  tags: any,
  comments: any,
};

export type UserInfo = {
  [userId: string]: {
    readyStatus: string,
    err: any,
    info: Object,
  },
};

export type Reducer = {
  routing: any,
  blog: BlogReducer,
};

export type Action =
  | {type: '@boldr/blog/FETCH_POSTS_REQUEST'}
  | {type: '@boldr/blog/FETCH_POSTS_SUCCESS', payload: NormalizrPayload}
  | {type: '@boldr/blog/FETCH_POSTS_FAILURE', err: any}
  | {type: '@boldr/blog/FETCH_POST_REQUEST', slug: string}
  | {type: '@boldr/blog/FETCH_POST_SUCCESS', slug: string, payload: Post}
  | {type: '@boldr/blog/FETCH_POST_FAILURE', slug: string, err: any};

export type Store = ReduxStore<Reducer, Action>;
// eslint-disable-next-line no-use-before-define
export type Dispatch = (
  action: Action | ThunkAction | PromiseAction | Array<Action>,
) => any;
export type GetState = () => Object;
export type ThunkAction = (dispatch: Dispatch, getState: GetState) => any;
export type PromiseAction = Promise<Action>;
