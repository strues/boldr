import settingsReducer from './reducer';
import { selectSettings, selectSettingFromList } from './selectors';
import { updateBoldrSettings } from './actions';

export default settingsReducer;

export { settingsReducer, selectSettings, selectSettingFromList, updateBoldrSettings };
