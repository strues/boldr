import dashboardReducer from './reducer';
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
  showSidebar,
  hideSidebar,
  fetchActivityIfNeeded,
  fetchActivity,
  fetchStatsIfNeeded,
  fetchStats,
};
