import * as t from '../actionTypes';

const INITIAL_STATE = {
  open: true,
  loaded: false,
  loading: false,
  error: null,
};

export default function dashboardReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case t.SHOW_SIDEBAR:
      return {
        ...state,
        loaded: true,
        open: true,
      };
    case t.HIDE_SIDEBAR:
      return {
        ...state,
        open: false,
      };
    case t.SET_ARTICLE:
      return {
        ...state,
        article: action.article,
      };
    default:
      return state;
  }
}
