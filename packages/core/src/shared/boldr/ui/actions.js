import * as t from '../actionTypes';

export function changeLayout(layout) {
  return {
    type: t.CHANGE_LAYOUT,
    payload: layout,
  };
}

export const showHideSidebar = () => ({ type: t.TOGGLE_SIDEBAR });
export const hideHeader = () => ({ type: t.HIDE_HEADER });
export const showHeader = () => ({ type: t.SHOW_HEADER });

export const expandCollapseSideMenu = () => ({ type: t.TOGGLE_SB_MENU });
export const showModal = () => ({ type: t.MODAL_OPEN });
export const hideModal = () => ({ type: t.MODAL_CLOSED });

export function setMobileDevice(enabled = true) {
  return {
    type: t.SET_MOBILE_DEVICE,
    payload: enabled,
  };
}

const uiActions = {
  showHideSidebar,
  hideHeader,
  showHeader,
  expandCollapseSideMenu,
  showModal,
  hideModal,
};

export default uiActions;
