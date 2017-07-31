import * as t from '../actionTypes';

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

export const LAYOUTS = {
  GALLERY: 'gallery',
  GRID: 'grid',
  LIST: 'list',
};

const INITIAL_STATE = {
  layout: LAYOUTS.GRID,
  modal: false,
  expanded: true,
  isMobile: false,
  visible: true,
  showSidebar: true,
  showHeader: true,
};

export default function uiReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case t.TOGGLE_SB_MENU:
      return toggleExpandCollapse(state);
    case t.TOGGLE_SIDEBAR:
      return toggleSidebar(state);

    case t.SHOW_HEADER:
      return {
        ...state,
        showHeader: true,
      };
    case t.HIDE_HEADER:
      return {
        ...state,
        showHeader: false,
      };
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
