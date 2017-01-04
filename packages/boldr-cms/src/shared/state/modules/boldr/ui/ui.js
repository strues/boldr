import { LAYOUTS } from '../../../../core/constants';
import * as t from './constants';

const INITIAL_STATE = {
  loaded: false,
  layout: LAYOUTS.GRID,
  isMobile: false,
  modal: false,
  drawer: false,
  navbar: false,
};

function uiReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case t.CHANGE_LAYOUT:
      return {
        ...state,
        layout: action.payload,
      };
    case t.SET_MOBILE_DEVICE:
      return {
        ...state,
        isMobile: action.payload,
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
    case t.EXPAND_NAVBAR:
      return {
        ...state,
        navbar: true,
      };
    case t.COLLAPSE_NAVBAR:
      return {
        ...state,
        navbar: false,
      };
    default:
      return state;
  }
}
export default uiReducer;
