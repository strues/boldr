import * as t from '../../actionTypes';

export function changeLayout(layout) {
  return {
    type: t.CHANGE_LAYOUT,
    payload: layout,
  };
}

export const showModal = () => ({ type: t.MODAL_OPEN });
export const hideModal = () => ({ type: t.MODAL_CLOSED });
export const openDrawer = () => ({ type: t.OPEN_DRAWER });
export const closeDrawer = () => ({ type: t.CLOSE_DRAWER });

export function setMobileDevice(enabled = true) {
  return { type: t.SET_MOBILE_DEVICE,
    payload: enabled };
}

export function updateMedia(drawerType, media) {
  return { type: t.UPDATE_MEDIA,
    drawerType,
    media };
}
export function updateDrawerType(drawerType) {
  return { type: t.UPDATE_DRAWER_TYPE,
    drawerType };
}
