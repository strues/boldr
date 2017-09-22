// @flow
import type { Store as ReduxStore } from 'redux';
import type { reducer as ReduxForm } from 'redux-form';
import type { CurrentUser } from './boldr';

// @todo: create types for actions
export type Action = any;

export type AuthState = {
  isAuthenticated: boolean,
  error?: string,
  loading?: boolean,
  token?: string,
  info: null | CurrentUser,
};
export type AdminState = any;
export type BlogState = any;
export type ApolloState = any;
export type BoldrState = any;
export type RouterState = any;

export type Reducer = {
  auth: AuthState,
  boldr: BoldrState,
  router: RouterState,
  form: ReduxForm,
  blog: BlogState,
  admin: AdminState,
  apollo: ApolloState,
};

export type Store = ReduxStore<Reducer, Action>;
// eslint-disable-next-line no-use-before-define
export type Dispatch = (action: Action | ThunkAction | PromiseAction | Array<Action>) => any;
export type GetState = () => Object;
export type ThunkAction = (dispatch: Dispatch, getState: GetState) => any;
export type PromiseAction = Promise<Action>;
