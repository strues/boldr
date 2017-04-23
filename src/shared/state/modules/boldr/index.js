import {
  menuReducer,
  MENU_STATE_KEY,
  selectMenus,
  selectMainMenu,
  makeSelectMainMenu,
  fetchMainMenu,
  fetchMainMenuIfNeeded,
  updateMenuDetails,
  addMenuDetail,
} from './menu';

import {
  settingsReducer,
  SETTINGS_STATE_KEY,
  selectSettings,
  selectSettingFromList,
  fetchSettingsIfNeeded,
  fetchSettings,
  updateBoldrSettings,
  arrayOfSetting,
  setting,
} from './settings';

import {
  uiReducer,
  UI_STATE_KEY,
  makeSelectUi,
  changeLayout,
  showModal,
  hideModal,
  setMobileDevice,
  makeSelectMobile,
  toggleDrawer,
} from './ui';

import boldrReducer, { STATE_KEY as BOLDR_STATE_KEY } from './reducer';
import { selectBoldr } from './selectors';

export {
  // main reducer
  boldrReducer,
  BOLDR_STATE_KEY,
  selectBoldr,
  // menu
  menuReducer,
  MENU_STATE_KEY,
  selectMenus,
  selectMainMenu,
  makeSelectMainMenu,
  fetchMainMenu,
  fetchMainMenuIfNeeded,
  updateMenuDetails,
  addMenuDetail,
  // settings
  settingsReducer,
  SETTINGS_STATE_KEY,
  selectSettings,
  selectSettingFromList,
  fetchSettingsIfNeeded,
  fetchSettings,
  updateBoldrSettings,
  arrayOfSetting,
  setting,
  // ui
  uiReducer,
  UI_STATE_KEY,
  makeSelectUi,
  changeLayout,
  showModal,
  hideModal,
  setMobileDevice,
  makeSelectMobile,
  toggleDrawer,
};
