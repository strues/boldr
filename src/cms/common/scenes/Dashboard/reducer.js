import { push } from 'react-router-redux';
import * as api from '../../core/services/api';
import { API_ACTIVITY } from '../../core/config/endpoints';

const LOAD_ACTIVITIES_REQUEST = '@boldr/dashboard/activity/LOAD_ACTIVITIES_REQUEST';
const LOAD_ACTIVITIES_SUCCESS = '@boldr/dashboard/activity/LOAD_ACTIVITIES_SUCCESS';
const LOAD_ACTIVITIES_FAILURE = '@boldr/dashboard/activity/LOAD_ACTIVITIES_FAILURE';

const loadActivities = () => ({
  type: LOAD_ACTIVITIES_REQUEST,
});

const loadActivitiesSuccess = (response) => {
  return {
    type: LOAD_ACTIVITIES_SUCCESS,
    payload: response.body,
  };
};

// Fail receivers
const failedToLoadActivities = (err) => ({
  type: LOAD_ACTIVITIES_FAILURE,
  loading: false,
  error: err,
});

export function loadSiteActivity() {
  return dispatch => {
    dispatch(loadActivities());
    return api.doGetActivities()
      .then(response => {
        if (response.status !== 200) {
          dispatch(failedToLoadActivities(response));
        }
        dispatch(loadActivitiesSuccess(response));
      })
      .catch(err => {
        dispatch(failedToLoadActivities(err));
      });
  };
}
const SHOW_SIDEBAR = '@boldr/dashboard/SHOW_SIDEBAR';
const HIDE_SIDEBAR = '@boldr/dashboard/HIDE_SIDEBAR';

export const showSidebar = () => ({ type: SHOW_SIDEBAR });
export const hideSidebar = () => ({ type: HIDE_SIDEBAR });

export function blocksClicked() {
  return (dispatch) => {
    dispatch(push('/dashboard/blocks'));
  };
}

export function postListClicked() {
  return (dispatch) => {
    dispatch(push('/dashboard/posts'));
  };
}

export function postEditorClicked() {
  return (dispatch) => {
    dispatch(push('/dashboard/posts/new'));
  };
}

export function dashboardClicked() {
  return (dispatch) => {
    dispatch(push('/dashboard'));
  };
}

export function fileManagerClicked() {
  return (dispatch) => {
    dispatch(push('/dashboard/filemanager'));
  };
}

export function membersClicked() {
  return (dispatch) => {
    dispatch(push('/dashboard/members'));
  };
}

export function navigationClicked() {
  return (dispatch) => {
    dispatch(push('/dashboard/navigation'));
  };
}

export function contentClicked() {
  return (dispatch) => {
    dispatch(push('/dashboard/content'));
  };
}


export function pagesClicked() {
  return (dispatch) => {
    dispatch(push('/dashboard/pages'));
  };
}

export function settingsClicked() {
  return (dispatch) => {
    dispatch(push('/dashboard/settings'));
  };
}

export function homeClicked() {
  return (dispatch) => {
    dispatch(push('/'));
  };
}

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
    case SHOW_SIDEBAR:
      return {
        ...state,
        loaded: true,
        docked: true,
        open: true,
      };
    case HIDE_SIDEBAR:
      return {
        ...state,
        open: false,
        docked: false,
      };
    case LOAD_ACTIVITIES_REQUEST:
      return {
        ...state,
        loaded: false,
        loading: true,
      };
    case LOAD_ACTIVITIES_SUCCESS:
      return {
        ...state,
        activities: action.payload,
        loaded: true,
        loading: false,
      };
    case LOAD_ACTIVITIES_FAILURE:
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

export function fetchActivities() {
  return {
    types: [LOAD_ACTIVITIES_REQUEST, LOAD_ACTIVITIES_SUCCESS, LOAD_ACTIVITIES_FAILURE],
    promise: (client) => client.get(`${API_ACTIVITY}`),
  };
}
