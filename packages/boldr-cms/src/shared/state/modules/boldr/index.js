import { combineReducers } from 'redux';
import uiReducer from './ui';
import meta from './meta';
import menuReducer from './menu';
import settingReducer from './settings';
// import pageReducer from './pages';

const boldrReducer = combineReducers({
  ui: uiReducer,
  meta,
  menu: menuReducer,
  settings: settingReducer,
  // pages: pageReducer,
});

export default boldrReducer;
