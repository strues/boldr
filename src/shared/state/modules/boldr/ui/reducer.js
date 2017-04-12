import { Drawer } from 'boldr-ui';
import { LAYOUTS } from '../../../../core/constants';
import * as t from '../../actionTypes';

export const STATE_KEY = 'ui';

function updateDrawerType(state, { drawerType }) {
  if (state.customDrawerType === drawerType) {
    return state;
  }

  return Object.assign({}, state, { customDrawerType: drawerType });
}
const { mobile, tablet, desktop } = Drawer.getCurrentMedia();
let defaultMedia = 'mobile';
if (desktop) {
  defaultMedia = 'desktop';
} else if (tablet) {
  defaultMedia = 'tablet';
}

const INITIAL_STATE = {
  loaded: false,
  layout: LAYOUTS.GRID,
  modal: false,
  drawer: false,
  expanded: false,
  isMobile: false,
  mobile,
  tablet,
  desktop,
  defaultMedia,
};

function uiReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case t.EXPAND_SIDEBAR_MENU:
      return {
        ...state,
        expanded: true,
      };
    case t.COLLAPSE_SIDEBAR_MENU:
      return {
        ...state,
        expanded: false,
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
    case t.OPEN_DRAWER:
      return {
        ...state,
        drawer: true,
      };
    case t.CLOSE_DRAWER:
      return {
        ...state,
        drawer: false,
      };
    case t.SET_MOBILE_DEVICE:
      return {
        ...state,
        isMobile: action.payload,
      };
    case t.UPDATE_MEDIA:
      return Object.assign({}, state, { ...action.media });
    case t.UPDATE_DRAWER_TYPE:
      return updateDrawerType(state, action);
    default:
      return state;
  }
}

export default uiReducer;
