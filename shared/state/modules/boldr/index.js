import { combineReducers } from 'redux';
import uiReducer from './ui';
import meta from './meta';
import menuReducer from './menu';
import settingReducer from './settings';
import pagesReducer, { STATE_KEY as PAGES_STATE_KEY } from './pages';
import templatesReducer, { STATE_KEY as TEMPLATES_STATE_KEY } from './templates';

const boldrReducer = combineReducers({
  ui: uiReducer,
  meta,
  menu: menuReducer,
  settings: settingReducer,
  [PAGES_STATE_KEY]: pagesReducer,
  [TEMPLATES_STATE_KEY]: templatesReducer,
});

export default boldrReducer;
