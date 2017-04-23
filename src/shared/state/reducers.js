import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import { routerReducer as routing } from 'react-router-redux';

import { blogReducer } from '../scenes/Blog/state';
import { adminReducer } from '../scenes/Admin/state';

import {
  authReducer,
  boldrReducer,
  usersReducer,
  mediaReducer,
  notificationReducer,
  entitiesReducer,
} from './modules';

const rootReducer = combineReducers({
  boldr: boldrReducer,
  blog: blogReducer,
  users: usersReducer,
  auth: authReducer,
  admin: adminReducer,
  media: mediaReducer,
  notifications: notificationReducer,
  entities: entitiesReducer,
  form: formReducer,
  routing,
});

export default rootReducer;
