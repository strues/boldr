/**
 * UI action types
 * @type {String}
 */
export const CHANGE_LAYOUT = '@boldr/ui/CHANGE_LAYOUT';
export const MODAL_OPEN = '@boldr/ui/MODAL_OPEN';
export const MODAL_CLOSED = '@boldr/ui/MODAL_CLOSED';
export const OPEN_DRAWER = '@boldr/ui/OPEN_DRAWER';
export const CLOSE_DRAWER = '@boldr/ui/CLOSE_DRAWER';
export const SET_MOBILE_DEVICE = '@boldr/ui/SET_MOBILE_DEVICE';
export const UPDATE_MEDIA = '@boldr/ui/UPDATE_MEDIA';
export const UPDATE_DRAWER_TYPE = '@boldr/ui/UPDATE_DRAWER_TYPE';
export const TOGGLE_SB_MENU = '@boldr/ui/TOGGLE_SB_MENU';
export const TOGGLE_SIDEBAR = '@boldr/ui/TOGGLE_SIDEBAR';

export function changeLayout(layout) {
  return {
    type: t.CHANGE_LAYOUT,
    payload: layout,
  };
}

export const showHideSidebar = () => ({type: TOGGLE_SIDEBAR});

export const expandCollapseSideMenu = () => ({type: TOGGLE_SB_MENU});
export const showModal = () => ({type: MODAL_OPEN});
export const hideModal = () => ({type: MODAL_CLOSED});
export const openDrawer = () => ({type: OPEN_DRAWER});
export const closeDrawer = () => ({type: CLOSE_DRAWER});

export function setMobileDevice(enabled = true) {
  return {
    type: SET_MOBILE_DEVICE,
    payload: enabled,
  };
}
