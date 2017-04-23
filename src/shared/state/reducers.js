import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import { routerReducer as routing } from 'react-router-redux';

import blogReducer, { BLOG_STATE_KEY } from '../scenes/Blog/state';
import adminReducer, { ADMIN_STATE_KEY } from '../scenes/Admin/state';

import {
  AUTH_STATE_KEY,
  authReducer,
  BOLDR_STATE_KEY,
  boldrReducer,
  USERS_STATE_KEY,
  usersReducer,
  MEDIA_STATE_KEY,
  mediaReducer,
  notificationReducer,
  entitiesReducer,
} from './modules';

const rootReducer = combineReducers({
  [BOLDR_STATE_KEY]: boldrReducer,
  [BLOG_STATE_KEY]: blogReducer,
  [USERS_STATE_KEY]: usersReducer,
  [AUTH_STATE_KEY]: authReducer,
  [ADMIN_STATE_KEY]: adminReducer,
  [MEDIA_STATE_KEY]: mediaReducer,
  notifications: notificationReducer,
  entities: entitiesReducer,
  form: formReducer,
  routing,
});

export default rootReducer;
