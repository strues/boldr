import {LAYOUTS} from '../../../../core/constants';
import {
  CHANGE_LAYOUT,
  MODAL_OPEN,
  MODAL_CLOSED,
  SET_MOBILE_DEVICE,
  UPDATE_MEDIA,
  UPDATE_DRAWER_TYPE,
  TOGGLE_SB_MENU,
  TOGGLE_DRAWER,
  TOGGLE_SIDEBAR,
} from './actions';

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
    case TOGGLE_SB_MENU:
      return toggleExpandCollapse(state);
    case TOGGLE_SIDEBAR:
      return toggleSidebar(state);
    case TOGGLE_DRAWER:
      return toggleDrawer(state);
    case CHANGE_LAYOUT:
      return {
        ...state,
        layout: action.payload,
      };
    case MODAL_OPEN:
      return {
        ...state,
        modal: true,
      };
    case MODAL_CLOSED:
      return {
        ...state,
        modal: false,
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
