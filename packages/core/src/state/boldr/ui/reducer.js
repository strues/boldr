// @flow
/**
 * @module @boldr/core/state/boldr/ui/reducer
 */

import * as t from '../actionTypes';
import type { UiState, Action } from '../../../types';

type State = UiState;

function toggleExpandCollapse(state: UiState) {
  const newState = Object.assign({}, state);
  newState.isExpanded = !newState.isExpanded;
  return newState;
}

function toggleDrawer(state: UiState) {
  const newState = Object.assign({}, state);
  newState.isDrawerOpen = !newState.isDrawerOpen;
  return newState;
}

function toggleModal(state: UiState) {
  const newState = Object.assign({}, state);
  newState.isModalVisible = !newState.isModalVisible;
  return newState;
}

const INITIAL_STATE = {
  layout: 'grid',
  isExpanded: false,
  isMobile: false,
  isDrawerOpen: false,
  isModalVisible: false,
};

export default function uiReducer(state: State = INITIAL_STATE, action: Action) {
  switch (action.type) {
    case t.TOGGLE_COLLAPSE:
      return toggleExpandCollapse(state);
    case t.TOGGLE_DRAWER:
      return toggleDrawer(state);
    case t.TOGGLE_MODAL:
      return toggleModal(state);
    case t.CHANGE_LAYOUT:
      return {
        ...state,
        // $FlowIssue
        layout: action.layout,
      };
    case t.SET_MOBILE_DEVICE:
      return {
        ...state,
        // $FlowIssue
        isMobile: action.enabled,
      };

    default:
      return state;
  }
}
