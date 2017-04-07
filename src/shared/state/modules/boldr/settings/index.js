import settingsReducer, { STATE_KEY } from './reducer';
import { selectSettings, selectSettingFromList } from './selectors';
import { fetchSettingsIfNeeded, fetchSettings, updateBoldrSettings } from './actions';

export default settingsReducer;

export {
  STATE_KEY,
  selectSettings,
  selectSettingFromList,
  fetchSettingsIfNeeded,
  fetchSettings,
  updateBoldrSettings,
};
