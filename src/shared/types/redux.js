/* @flow */
import type { Store as ReduxStore } from 'redux';

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
  | 'FETCH_ARTICLE_REQUEST'
  | 'FETCH_ARTICLE_SUCCESS'
  | 'FETCH_ARTICLE_FAILURE'
  | 'UPDATE_ARTICLE_REQUEST'
  | 'UPDATE_ARTICLE_SUCCESS'
  | 'UPDATE_ARTICLE_FAILURE'
  | 'SELECT_ARTICLE'
  | 'SELECT_ARTICLE_SUCCESS'
  | 'SELECT_ARTICLE_FAILURE'
  | 'CREATE_ARTICLE_REQUEST'
  | 'CREATE_ARTICLE_SUCCESS'
  | 'CREATE_ARTICLE_FAILURE'
  | 'DELETE_ARTICLE_FAILURE'
  | 'DELETE_ARTICLE_REQUEST'
  | 'DELETE_ARTICLE_SUCCESS';

export type ArticlesReducer = Object & {
  all: Object,
  ids: Array<Object>,
  isFetching: boolean,
  currentArticle: Object,
};

export type BlogReducer = {
  articles: ArticlesReducer,
  tags: any,
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
  | { type: '@boldr/blog/FETCH_ARTICLES_REQUEST' }
  | { type: '@boldr/blog/FETCH_ARTICLES_SUCCESS', payload: NormalizrPayload }
  | { type: '@boldr/blog/FETCH_ARTICLES_FAILURE', err: any }
  | { type: '@boldr/blog/FETCH_ARTICLE_REQUEST', slug: string }
  | {
      type: '@boldr/blog/FETCH_ARTICLE_SUCCESS',
      slug: string,
      payload: Article,
    }
  | { type: '@boldr/blog/FETCH_ARTICLE_FAILURE', slug: string, err: any };

export type Store = ReduxStore<Reducer, Action>;
// eslint-disable-next-line no-use-before-define
export type Dispatch = (
  action: Action | ThunkAction | PromiseAction | Array<Action>,
) => any;
export type GetState = () => Object;
export type ThunkAction = (dispatch: Dispatch, getState: GetState) => any;
export type PromiseAction = Promise<Action>;
