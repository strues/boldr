import uiReducer, { STATE_KEY } from './ui';
import { changeLayout, showModal, hideModal, setMobileDevice } from './actions';

export default uiReducer;

export {
  STATE_KEY,
  changeLayout,
  showModal,
  hideModal,
  setMobileDevice,
};
