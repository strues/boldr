import { LAYOUTS } from 'core/constants';

export const CHANGE_LAYOUT = '@boldr/CHANGE_LAYOUT';
export const SET_MOBILE_DEVICE = '@boldr/SET_MOBILE_DEVICE';
export const MODAL_OPEN = '@boldr/MODAL_OPEN';
export const MODAL_CLOSED = '@boldr/MODAL_CLOSED';

export function changeLayout(layout) {
  return {
    type: CHANGE_LAYOUT,
    payload: layout,
  };
}
export const showModal = () => ({ type: MODAL_OPEN });
export const hideModal = () => ({ type: MODAL_CLOSED });

export function setMobileDevice(enabled = true) {
  return { type: SET_MOBILE_DEVICE, payload: enabled };
}
const INITIAL_STATE = {
  loaded: false,
  layout: LAYOUTS.GRID,
  isMobile: false,
  modal: false,
};

function uiReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case CHANGE_LAYOUT:
      return {
        ...state,
        layout: action.payload,
      };
    case SET_MOBILE_DEVICE:
      return {
        ...state,
        isMobile: action.payload,
      };
    case MODAL_OPEN:
      return {
        ...state,
        modal: true,
      };
    case MODAL_CLOSED:
      return {
        ...state,
        modal: false,
      };
    default:
      return state;
  }
}
export default uiReducer;
