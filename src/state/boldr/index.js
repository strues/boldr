import {
  menuReducer,
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
  selectSettings,
  selectSettingFromList,
  updateBoldrSettings,
} from './settings';

import {
  uiReducer,
  makeSelectUi,
  changeLayout,
  showModal,
  hideModal,
  setMobileDevice,
  makeSelectMobile,
  toggleDrawer,
  showHideSidebar,
  expandCollapseSideMenu,
  layoutSelector,
} from './ui';

import boldrReducer from './reducer';
import { selectBoldr } from './selectors';

export {
  // main reducer
  boldrReducer,
  selectBoldr,
  // menu
  menuReducer,
  selectMenus,
  selectMainMenu,
  makeSelectMainMenu,
  fetchMainMenu,
  fetchMainMenuIfNeeded,
  updateMenuDetails,
  addMenuDetail,
  // settings
  settingsReducer,
  selectSettings,
  selectSettingFromList,
  updateBoldrSettings,
  // ui
  uiReducer,
  makeSelectUi,
  changeLayout,
  showModal,
  hideModal,
  setMobileDevice,
  makeSelectMobile,
  toggleDrawer,
  showHideSidebar,
  expandCollapseSideMenu,
  layoutSelector,
};
