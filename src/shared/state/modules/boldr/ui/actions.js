import * as t from '../../actionTypes';

export function changeLayout(layout) {
  return {
    type: t.CHANGE_LAYOUT,
    payload: layout,
  };
}

export const showHideSidebar = () => ({ type: t.TOGGLE_SIDEBAR });

export const expandCollapseSideMenu = () => ({ type: t.TOGGLE_SB_MENU });
export const showModal = () => ({ type: t.MODAL_OPEN });
export const hideModal = () => ({ type: t.MODAL_CLOSED });
export const openDrawer = () => ({ type: t.OPEN_DRAWER });
export const closeDrawer = () => ({ type: t.CLOSE_DRAWER });

export function setMobileDevice(enabled = true) {
  return {
    type: t.SET_MOBILE_DEVICE,
    payload: enabled,
  };
}
