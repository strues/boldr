import { combineReducers } from 'redux';
import uiReducer from './ui';
import { menuReducer } from './menu';
import { settingsReducer } from './settings';

const boldrReducer = combineReducers({
  menus: menuReducer,
  settings: settingsReducer,
  ui: uiReducer,
});

export default boldrReducer;
