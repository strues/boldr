import { combineReducers } from 'redux';
import uiReducer from './ui/reducer';
import settingsReducer from './settings/reducer';
import notificationsReducer from './notifications/notifications';

const boldrReducer = combineReducers({
  ui: uiReducer,
  settings: settingsReducer,
  notifications: notificationsReducer,
});

export default boldrReducer;
