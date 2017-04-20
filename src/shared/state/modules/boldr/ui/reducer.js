import { LAYOUTS } from '../../../../core/constants';
import * as t from '../constants';

export const STATE_KEY = 'ui';

function toggleExpandCollapse(state) {
  const newState = Object.assign({}, state);
  newState.expanded = !newState.expanded;
  return newState;
}
function toggleSidebar(state) {
  const newState = Object.assign({}, state);
  newState.visible = !newState.visible;
  return newState;
}
function toggleDrawer(state) {
  const newState = Object.assign({}, state);
  newState.drawer = !newState.drawer;
  return newState;
}
const INITIAL_STATE = {
  loaded: false,
  layout: LAYOUTS.GRID,
  modal: false,
  drawer: false,
  expanded: true,
  isMobile: false,
  visible: true,
};

function uiReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case t.TOGGLE_SB_MENU:
      return toggleExpandCollapse(state);
    case t.TOGGLE_SIDEBAR:
      return toggleSidebar(state);
    case t.TOGGLE_DRAWER:
      return toggleDrawer(state);
    case t.CHANGE_LAYOUT:
      return {
        ...state,
        layout: action.payload,
      };
    case t.MODAL_OPEN:
      return {
        ...state,
        modal: true,
      };
    case t.MODAL_CLOSED:
      return {
        ...state,
        modal: false,
      };
    case t.SET_MOBILE_DEVICE:
      return {
        ...state,
        isMobile: action.payload,
      };

    default:
      return state;
  }
}

export default uiReducer;
