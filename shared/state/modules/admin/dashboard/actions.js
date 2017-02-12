import * as api from '../../../../core/api';
import * as t from './constants';

export const showSidebar = () => ({ type: t.SHOW_SIDEBAR });
export const hideSidebar = () => ({ type: t.HIDE_SIDEBAR });

/**
  * LOAD ACTIVITY ACTIONS
  * -------------------------
  * @exports loadSiteActivity
  *****************************************************************/

export function fetchSiteActivity() {
  return dispatch => {
    dispatch(loadActivities());
    return api.getAllActivities()
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
export function loadSiteActivity() {
  return (dispatch, getState) => {
    if (shouldFetchActivity(getState())) {
      return dispatch(fetchSiteActivity());
    }

    return Promise.resolve();
  };
}
function shouldFetchActivity(state) {
  const activities = state.admin.dashboard.activities;
  if (!activities.length) {
    return true;
  }
  if (activities.length) {
    return false;
  }
  return activities;
}
const loadActivities = () => ({
  type: t.LOAD_ACTIVITIES_REQUEST,
});

function loadActivitiesSuccess(response) {
  return {
    type: t.LOAD_ACTIVITIES_SUCCESS,
    payload: response.body,
  };
}

const failedToLoadActivities = (err) => ({
  type: t.LOAD_ACTIVITIES_FAILURE,
  loading: false,
  error: err,
});

/**
  * FETCH STATS ACTIONS
  * -------------------------
  * @exports fetchStats
  *****************************************************************/

export function fetchDashboardStats() {
  return dispatch => {
    dispatch(beginFetchStats());
    return api.getAllStats()
      .then(response => {
        if (response.status !== 200) {
          dispatch(failedToFetchStats(response));
        }
        dispatch(fetchStatsSuccess(response));
      })
      .catch(err => {
        dispatch(failedToFetchStats(err));
      });
  };
}

export function fetchStats() {
  return (dispatch, getState) => {
    if (shouldFetchStats(getState())) {
      return dispatch(fetchDashboardStats());
    }

    return Promise.resolve();
  };
}

function shouldFetchStats(state) {
  const stats = state.admin.dashboard.activities;
  if (!stats.length) {
    return true;
  }
  if (stats.length) {
    return false;
  }
  return stats;
}

const beginFetchStats = () => ({
  type: t.FETCH_STATS_REQUEST,
});

const fetchStatsSuccess = (response) => {
  return {
    type: t.FETCH_STATS_SUCCESS,
    payload: response.body,
  };
};

// Fail receivers
const failedToFetchStats = (err) => ({
  type: t.FETCH_STATS_FAILURE,
  error: err,
});
