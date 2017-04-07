import * as t from '../../actionTypes';

export const STATE_KEY = 'dashboard';

const INITIAL_STATE = {
  open: true,
  loaded: false,
  loading: false,
  error: null,
  activities: [],
  stats: {},
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
    case t.FETCH_ACTIVITY_REQUEST:
    case t.FETCH_STATS_REQUEST:
      return {
        ...state,
        loaded: false,
        loading: true,
      };
    case t.FETCH_ACTIVITY_SUCCESS:
      return {
        ...state,
        activities: action.payload,
        loaded: true,
        loading: false,
      };
    case t.FETCH_STATS_SUCCESS:
      return {
        ...state,
        stats: action.payload,
        loaded: true,
        loading: false,
      };
    case t.FETCH_ACTIVITY_FAILURE:
    case t.FETCH_STATS_FAILURE:
      return {
        ...state,
        error: action.error,
        loaded: true,
        loading: false,
      };
    default:
      return state;
  }
}
