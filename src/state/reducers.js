import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import { routerReducer } from '../core/RouterConnection';
// internal reducers
import blogReducer from '../scenes/Blog/state/reducer';
import adminReducer from '../scenes/Admin/state/reducer';
import authReducer from '../scenes/Account/state/reducer';
import usersReducer from './users/reducer';
import boldrReducer from './boldr/reducer';
import notificationReducer from './notifications/notifications';

/**
 * Placeholder for a non active reducer in Redux.
 */
export function emptyReducer(previousState = {}, action) {
  return previousState;
}

/**
 * Placeholder for a non active middleware in Redux.
 */
export function emptyMiddleware(store) {
  return next => {
    return action => {
      return next(action);
    };
  };
}

/**
 * Placeholder for a non active enhancer in Redux.
 */
export function emptyEnhancer(param) {
  return param;
}

/**
 * Dummy reducer for exporting server-side data to the client-side application.
 */
export function ssrReducer(previousState = {}, action) {
  return previousState;
}

/**
 * Selector for quering the current locale e.g. de-DE, en-US, ...
 */
export function getLocale(state) {
  return state.ssr.locale;
}

/**
 * Selector for quering the current language e.g. de, en, fr, es, ...
 */
export function getLanguage(state) {
  return state.ssr.language;
}

/**
 * Selector for querying the current region e.g. DE, BR, PT, ...
 */
export function getRegion(state) {
  return state.ssr.region;
}

export default function getReducers(apolloClient) {
  return combineReducers({
    apollo: apolloClient.reducer(),
    ssr: ssrReducer,
    boldr: boldrReducer,
    blog: blogReducer,
    users: usersReducer,
    auth: authReducer,
    admin: adminReducer,
    notifications: notificationReducer,
    form: formReducer,
    router: routerReducer,
  });
}
