import { combineReducers } from 'redux';

import {
  attachmentReducer,
  dashboardReducer,
  membersReducer,
  ATTACHMENT_STATE_KEY,
  DASHBOARD_STATE_KEY,
  MEMBERS_STATE_KEY,
} from './index';

export const STATE_KEY = 'admin';

const adminReducer = combineReducers({
  [ATTACHMENT_STATE_KEY]: attachmentReducer,
  [DASHBOARD_STATE_KEY]: dashboardReducer,
  [MEMBERS_STATE_KEY]: membersReducer,
});

export default adminReducer;
