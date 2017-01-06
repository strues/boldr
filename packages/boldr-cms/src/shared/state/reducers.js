import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import { routerReducer as routing } from 'react-router-redux';

import accountReducer, { STATE_KEY as ACCOUNT_STATE_KEY } from './modules/account';
import boldrReducer from './modules/boldr';
import adminReducer, { STATE_KEY as ADMIN_STATE_KEY } from './modules/admin';
import blogReducer, { STATE_KEY as BLOG_STATE_KEY } from './modules/blog';
import notificationReducer from './modules/notifications';
import entities from './modules/entities';


const rootReducer = combineReducers({
  form: formReducer,
  entities,
  boldr: boldrReducer,
  [ACCOUNT_STATE_KEY]: accountReducer,
  [BLOG_STATE_KEY]: blogReducer,
  [ADMIN_STATE_KEY]: adminReducer,
  notifications: notificationReducer,
  routing,
});

export default rootReducer;
