import { GRID } from 'core/config/layouts';

export const CHANGE_LAYOUT = '@boldr/CHANGE_LAYOUT';
export const SET_MOBILE_DEVICE = '@boldr/SET_MOBILE_DEVICE';

export function changeLayout(layout) {
  return {
    type: CHANGE_LAYOUT,
    payload: layout,
  };
}

export function setMobileDevice(enabled = true) {
  return { type: SET_MOBILE_DEVICE, payload: enabled };
}
const INITIAL_STATE = {
  loaded: false,
  layout: GRID,
  isMobile: false,
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
    default:
      return state;
  }
}
export default uiReducer;
