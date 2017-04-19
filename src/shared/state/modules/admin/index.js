import { combineReducers } from 'redux';

import dashboardReducer, {
  STATE_KEY as DASHBOARD_STATE_KEY,
} from './dashboard';
import membersReducer, { STATE_KEY as MEMBERS_STATE_KEY } from './members';

export const STATE_KEY = 'admin';

const adminReducer = combineReducers({
  [DASHBOARD_STATE_KEY]: dashboardReducer,
  [MEMBERS_STATE_KEY]: membersReducer,
});

export default adminReducer;
