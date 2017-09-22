import { combineReducers } from 'redux';
import dashboardReducer from './dashboard/reducer';
import membersReducer from './members/reducer';
import mediaReducer from './media/reducer';

const adminReducer = combineReducers({
  dashboard: dashboardReducer,
  members: membersReducer,
  media: mediaReducer,
});

export default adminReducer;
