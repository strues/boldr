import { combineReducers } from 'redux';
import { uiReducer, UI_STATE_KEY } from './ui';
import { menuReducer, MENU_STATE_KEY } from './menu';
import { settingsReducer, SETTINGS_STATE_KEY } from './settings';

export const STATE_KEY = 'boldr';

const boldrReducer = combineReducers({
  [MENU_STATE_KEY]: menuReducer,
  [SETTINGS_STATE_KEY]: settingsReducer,
  [UI_STATE_KEY]: uiReducer,
});

export default boldrReducer;
