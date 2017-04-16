import uiReducer, {STATE_KEY} from './reducer';
import {changeLayout, showModal, hideModal, setMobileDevice} from './actions';
import {makeSelectUi, makeSelectMobile} from './selectors';

export default uiReducer;

export {
  STATE_KEY,
  makeSelectUi,
  changeLayout,
  showModal,
  hideModal,
  setMobileDevice,
  makeSelectMobile,
};
