
import * as t from './constants';

export const STATE_KEY = 'dashboard';

const INITIAL_STATE = {
  docked: true,
  open: true,
  loaded: false,
  loading: false,
  error: null,
  activities: [],
};

export default function dashboardReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case t.SHOW_SIDEBAR:
      return {
        ...state,
        loaded: true,
        docked: true,
        open: true,
      };
    case t.HIDE_SIDEBAR:
      return {
        ...state,
        open: false,
        docked: false,
      };
    case t.LOAD_ACTIVITIES_REQUEST:
      return {
        ...state,
        loaded: false,
        loading: true,
      };
    case t.LOAD_ACTIVITIES_SUCCESS:
      return {
        ...state,
        activities: action.payload,
        loaded: true,
        loading: false,
      };
    case t.LOAD_ACTIVITIES_FAILURE:
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

export function isLoaded(globalState) {
  return globalState.dashboard.activity && globalState.dashboard.activity.loaded;
}
