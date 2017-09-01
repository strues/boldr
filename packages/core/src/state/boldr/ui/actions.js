// @flow

/**
 * @module @boldr/core/state/boldr/ui/actions
 */
import * as t from '../actionTypes';
import type { LayoutOpts } from '../../../types';

export function changeLayout(layout: LayoutOpts) {
  return {
    type: t.CHANGE_LAYOUT,
    layout,
  };
}

export const toggleDrawer = () => ({ type: t.TOGGLE_DRAWER });
export const toggleCollapse = () => ({ type: t.TOGGLE_COLLAPSE });
export const toggleModal = () => ({ type: t.TOGGLE_MODAL });

export function setMobileDevice(enabled: boolean = true) {
  return {
    type: t.SET_MOBILE_DEVICE,
    enabled,
  };
}
