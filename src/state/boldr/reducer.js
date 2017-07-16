import { combineReducers } from 'redux';
import uiReducer from './ui';
import settingsReducer from './settings';

const boldrReducer = combineReducers({
  settings: settingsReducer,
  ui: uiReducer,
});

export default boldrReducer;
