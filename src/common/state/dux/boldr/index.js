/**
 * BOLDR REDUCER
 * src/state/dux/boldr/index
 * @exports boldrReducer
 */
import { combineReducers } from 'redux';
import { push } from 'react-router-redux';
import navReducer from './nav';
import pagesReducer from './pages';
import settingsReducer from './settings';


export function goHome() {
  return (dispatch) => {
    dispatch(push('/'));
  };
}

export function goTo(pathname, options = {}) {
  return push({
    pathname,
    search: options.search,
    state: options.state,
  });
}

const boldrReducer = combineReducers({
  nav: navReducer,
  settings: settingsReducer,
  pages: pagesReducer,
});

export default boldrReducer;
