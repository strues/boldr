import settingsReducer from './reducer';
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
  selectSettings,
  selectSettingFromList,
  fetchSettingsIfNeeded,
  fetchSettings,
  updateBoldrSettings,
  arrayOfSetting,
  setting,
};
