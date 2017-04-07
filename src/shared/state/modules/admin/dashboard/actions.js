import * as t from '../../actionTypes';

export const showSidebar = () => ({ type: t.SHOW_SIDEBAR });
export const hideSidebar = () => ({ type: t.HIDE_SIDEBAR });

/**
  * LOAD ACTIVITY ACTIONS
  * -------------------------
  * @exports fetchActivityIfNeeded
  *****************************************************************/

/* istanbul ignore next */
export const fetchActivityIfNeeded = (): ThunkAction =>
  (dispatch: Dispatch, getState: GetState, axios: any) => {
    /* istanbul ignore next */
    if (shouldFetchActivity(getState())) {
      /* istanbul ignore next */
      return dispatch(fetchActivity(axios));
    }

    /* istanbul ignore next */
    return null;
  };

export const fetchActivity = (axios: any): ThunkAction =>
  (dispatch: Dispatch) => {
    dispatch({ type: t.FETCH_ACTIVITY_REQUEST });

    return axios
      .get('/api/v1/activities')
      .then(res => {
        dispatch({
          type: t.FETCH_ACTIVITY_SUCCESS,
          payload: res.data,
        });
      })
      .catch(err => {
        dispatch({
          type: t.FETCH_ACTIVITY_FAILURE,
          error: err,
        });
      });
  };

function shouldFetchActivity(state) {
  const { activities } = state.admin.dashboard;
  if (!activities.length) {
    return true;
  }

  return false;
}

/**
  * FETCH STATS ACTIONS
  * -------------------------
  * @exports fetchStatsIfNeeded
  * @exports fetchStats
  *****************************************************************/

/* istanbul ignore next */
export const fetchStatsIfNeeded = (): ThunkAction =>
  (dispatch: Dispatch, getState: GetState, axios: any) => {
    /* istanbul ignore next */
    if (shouldfetchStats(getState())) {
      /* istanbul ignore next */
      return dispatch(fetchStatsIfNeeded(axios));
    }

    /* istanbul ignore next */
    return null;
  };

export const fetchStats = (axios: any): ThunkAction =>
  (dispatch: Dispatch) => {
    dispatch({ type: t.FETCH_STATS_REQUEST });

    return axios
      .get('/api/v1/admin/stats')
      .then(res => {
        dispatch({
          type: t.FETCH_STATS_SUCCESS,
          payload: res.data,
        });
      })
      .catch(err => {
        dispatch({
          type: t.FETCH_STATS_FAILURE,
          error: err,
        });
      });
  };

function shouldfetchStats(state) {
  const { stats } = state.admin.dashboard;
  if (!stats.length) {
    return true;
  }

  return false;
}
