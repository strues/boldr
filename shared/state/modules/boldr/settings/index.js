import settingsReducer, { STATE_KEY } from './reducer';
import { getSettings, getSettingFromList } from './selectors';
import { fetchSettingsIfNeeded, loadBoldrSettings, updateBoldrSettings } from './actions';

export default settingsReducer;

export {
  STATE_KEY,
  getSettings,
  getSettingFromList,
  fetchSettingsIfNeeded,
  loadBoldrSettings,
  updateBoldrSettings,
};
