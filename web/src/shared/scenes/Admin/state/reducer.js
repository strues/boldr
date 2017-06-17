import { combineReducers } from 'redux';
import attachmentReducer from './attachments/reducer';
import dashboardReducer from './dashboard/reducer';
import membersReducer from './members/reducer';
import mediaReducer from './media/reducer';

const adminReducer = combineReducers({
  attachments: attachmentReducer,
  dashboard: dashboardReducer,
  members: membersReducer,
  media: mediaReducer,
});

export default adminReducer;
