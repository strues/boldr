import { LAYOUTS } from '../../../../core/constants';
import * as t from './constants';

export const STATE_KEY = 'ui';

const INITIAL_STATE = {
  loaded: false,
  layout: LAYOUTS.GRID,
  modal: false,
  drawer: false,
  isMobile: false,
};

function uiReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
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
    default:
      return state;
  }
}

export default uiReducer;
