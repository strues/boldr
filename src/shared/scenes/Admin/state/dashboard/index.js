import dashboardReducer, { STATE_KEY as DASHBOARD_STATE_KEY } from './reducer';
import {
  showSidebar,
  hideSidebar,
  fetchActivityIfNeeded,
  fetchActivity,
  fetchStatsIfNeeded,
  fetchStats,
} from './actions';

export default dashboardReducer;

export {
  dashboardReducer,
  DASHBOARD_STATE_KEY,
  showSidebar,
  hideSidebar,
  fetchActivityIfNeeded,
  fetchActivity,
  fetchStatsIfNeeded,
  fetchStats,
};
