import settingsReducer from './settings/reducer';

import { uiReducer, toggleDrawer, showHideSidebar, expandCollapseSideMenu } from './ui';

import boldrReducer from './reducer';

export {
  // main reducer
  boldrReducer,
  // settings
  settingsReducer,
  // ui
  uiReducer,
  changeLayout,
  showModal,
  hideModal,
  setMobileDevice,
  toggleDrawer,
  showHideSidebar,
  expandCollapseSideMenu,
};
