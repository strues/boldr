import * as t from './constants';

export function changeLayout(layout) {
  return {
    type: t.CHANGE_LAYOUT,
    payload: layout,
  };
}

export const showModal = () => ({ type: t.MODAL_OPEN });
export const hideModal = () => ({ type: t.MODAL_CLOSED });

export function setMobileDevice(enabled = true) {
  return { type: t.SET_MOBILE_DEVICE, payload: enabled };
}
