import { combineReducers } from 'redux';
import uiReducer, { STATE_KEY as UI_STATE_KEY } from './ui';
import menuReducer, { STATE_KEY as MENU_STATE_KEY } from './menu';
import settingReducer, { STATE_KEY as SETTINGS_STATE_KEY } from './settings';
import templatesReducer, {
  STATE_KEY as TEMPLATES_STATE_KEY,
} from './templates';

export const STATE_KEY = 'boldr';

const boldrReducer = combineReducers({
  [UI_STATE_KEY]: uiReducer,
  [MENU_STATE_KEY]: menuReducer,
  [SETTINGS_STATE_KEY]: settingReducer,
  [TEMPLATES_STATE_KEY]: templatesReducer,
});

export default boldrReducer;
