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
import { makeSelectUi, makeSelectMobile } from './selectors';

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
};
