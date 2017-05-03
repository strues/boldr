import {
  authReducer,
  doSignup,
  doLogin,
  logout,
  checkAuth,
  selectAuth,
} from './auth';

import entitiesReducer from './entities';

import {
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
  fetchSettingsIfNeeded,
  fetchSettings,
  updateBoldrSettings,
  arrayOfSetting,
  setting,
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
} from './boldr';

import {
  mediaReducer,
  fetchMediaIfNeeded,
  getMedia,
  getMediaType,
  selectMedia,
  toggleMedia,
  editMedia,
  deleteMedia,
  uploadMediaFile,
  media,
  arrayOfMedia,
} from './media';

import {
  usersReducer,
  fetchProfileIfNeeded,
  fetchProfile,
  selectMe,
  forgotPassword,
  resetPassword,
  verifyAccount,
  editProfile,
  selectUsers,
  selectProfile,
  makeSelectCurrentProfile,
  makeSelectUser,
} from './users';
import {
  notificationReducer,
  sendNotification,
  dismissNotification,
  clearNotification,
} from './notifications';

export {
  // auth
  authReducer,
  doSignup,
  doLogin,
  logout,
  checkAuth,
  selectAuth,
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
  fetchSettingsIfNeeded,
  fetchSettings,
  updateBoldrSettings,
  arrayOfSetting,
  setting,
  // ui
  uiReducer,
  showHideSidebar,
  expandCollapseSideMenu,
  makeSelectUi,
  changeLayout,
  showModal,
  hideModal,
  setMobileDevice,
  makeSelectMobile,
  toggleDrawer,
  layoutSelector,
  // media
  mediaReducer,
  fetchMediaIfNeeded,
  getMedia,
  getMediaType,
  selectMedia,
  toggleMedia,
  editMedia,
  deleteMedia,
  uploadMediaFile,
  media,
  arrayOfMedia,
  // users
  usersReducer,
  fetchProfileIfNeeded,
  fetchProfile,
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
  // entities
  entitiesReducer,
};
