import settingsReducer, { STATE_KEY } from './settings';
import { getSettings, selectSetting } from './selectors';
import { fetchSettingsIfNeeded, loadBoldrSettings, updateBoldrSettings } from './actions';

export default settingsReducer;

export {
  STATE_KEY,
  getSettings,
  selectSetting,
  fetchSettingsIfNeeded,
  loadBoldrSettings,
  updateBoldrSettings,
};
