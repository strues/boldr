/* istanbul ignore next */
import { combineReducers } from 'redux';
/* istanbul ignore next */
import uiReducer from './ui/reducer';
/* istanbul ignore next */
import settingsReducer from './settings/reducer';
/* istanbul ignore next */
import notificationsReducer from './notifications/reducer';

/* istanbul ignore next */
const boldrReducer = combineReducers({
  ui: uiReducer,
  settings: settingsReducer,
  notifications: notificationsReducer,
});

export default boldrReducer;
