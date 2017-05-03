import uiReducer from './reducer';
import {
  changeLayout,
  showModal,
  hideModal,
  setMobileDevice,
  toggleDrawer,
  showHideSidebar,
  expandCollapseSideMenu,
} from './actions';
import { makeSelectUi, makeSelectMobile, layoutSelector } from './selectors';

export default uiReducer;

export {
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
