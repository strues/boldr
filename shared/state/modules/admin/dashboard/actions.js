import * as api from '../../../../core/api';
import * as t from './constants';

export const showSidebar = () => ({ type: t.SHOW_SIDEBAR });
export const hideSidebar = () => ({ type: t.HIDE_SIDEBAR });

const loadActivities = () => ({
  type: t.LOAD_ACTIVITIES_REQUEST,
});

const loadActivitiesSuccess = (response) => {
  return {
    type: t.LOAD_ACTIVITIES_SUCCESS,
    payload: response.body,
  };
};

// Fail receivers
const failedToLoadActivities = (err) => ({
  type: t.LOAD_ACTIVITIES_FAILURE,
  loading: false,
  error: err,
});

export function loadSiteActivity() {
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

export function fetchStats() {
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
