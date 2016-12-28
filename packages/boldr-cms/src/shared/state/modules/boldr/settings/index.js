import settingsReducer from './settings';
import { getSettings, selectSetting } from './selectors';
import { fetchSettingsIfNeeded, loadBoldrSettings, updateBoldrSettings } from './actions';

export default settingsReducer;

export {
  getSettings,
  selectSetting,
  fetchSettingsIfNeeded,
  loadBoldrSettings,
  updateBoldrSettings,
};
