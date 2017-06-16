import {
  // boldr
  boldrReducer,
  selectBoldr,
  // menu
  menuReducer,
  selectMenus,
  selectMainMenu,
  makeSelectMainMenu,
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
  // media
  mediaReducer,
  getMedia,
  getMediaType,
  selectMedia,
  toggleMedia,
  editMedia,
  deleteMedia,
  uploadMediaFile,
  // users
  usersReducer,
  selectMe,
  forgotPassword,
  resetPassword,
  verifyAccount,
  editProfile,
  selectUsers,
  selectProfile,
  makeSelectCurrentProfile,
  makeSelectUser,
  // notifications
  notificationReducer,
  sendNotification,
  dismissNotification,
  clearNotification,
} from './modules';

import rootReducer from './reducers';
import configureStore from './store';

export {
  rootReducer,
  configureStore,
  // boldr
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
  // media
  mediaReducer,
  getMedia,
  getMediaType,
  selectMedia,
  toggleMedia,
  editMedia,
  deleteMedia,
  uploadMediaFile,
  // users
  usersReducer,
  selectMe,
  forgotPassword,
  resetPassword,
  verifyAccount,
  editProfile,
  selectUsers,
  selectProfile,
  makeSelectCurrentProfile,
  makeSelectUser,
  // notifications
  notificationReducer,
  sendNotification,
  dismissNotification,
  clearNotification,
};
