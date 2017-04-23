import settingsReducer, { STATE_KEY as SETTINGS_STATE_KEY } from './reducer';
import { selectSettings, selectSettingFromList } from './selectors';
import {
  fetchSettingsIfNeeded,
  fetchSettings,
  updateBoldrSettings,
} from './actions';
import { arrayOfSetting, setting } from './schema';

export default settingsReducer;

export {
  settingsReducer,
  SETTINGS_STATE_KEY,
  selectSettings,
  selectSettingFromList,
  fetchSettingsIfNeeded,
  fetchSettings,
  updateBoldrSettings,
  arrayOfSetting,
  setting,
};
