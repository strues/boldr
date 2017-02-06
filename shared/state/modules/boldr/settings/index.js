import settingsReducer, { STATE_KEY } from './settings';
import { getSettings } from './selectors';
import { fetchSettingsIfNeeded, loadBoldrSettings, updateBoldrSettings } from './actions';

export default settingsReducer;

export {
  STATE_KEY,
  getSettings,
  fetchSettingsIfNeeded,
  loadBoldrSettings,
  updateBoldrSettings,
};
