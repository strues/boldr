/**
 * @module boldr-core/state/ui/actions
 */
import * as t from '../actionTypes';

export function changeLayout(layout) {
  return {
    type: t.CHANGE_LAYOUT,
    payload: layout,
  };
}

export const toggleSidebar = () => ({ type: t.TOGGLE_SIDEBAR });
export const hideHeader = () => ({ type: t.HIDE_HEADER });
export const showHeader = () => ({ type: t.SHOW_HEADER });

export const toggleCollapse = () => ({ type: t.TOGGLE_COLLAPSE });
export const showModal = () => ({ type: t.MODAL_OPEN });
export const hideModal = () => ({ type: t.MODAL_CLOSED });

export function setMobileDevice(enabled = true) {
  return {
    type: t.SET_MOBILE_DEVICE,
    payload: enabled,
  };
}

const uiActions = {
  toggleSidebar,
  hideHeader,
  showHeader,
  toggleCollapse,
  showModal,
  hideModal,
};

export default uiActions;
