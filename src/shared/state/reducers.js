import {combineReducers} from 'redux';
import {reducer as formReducer} from 'redux-form';
import {routerReducer as routing} from 'react-router-redux';
import authReducer, {STATE_KEY as AUTH_STATE_KEY} from './modules/auth';
import boldrReducer, {STATE_KEY as BOLDR_STATE_KEY} from './modules/boldr';
import adminReducer, {STATE_KEY as ADMIN_STATE_KEY} from './modules/admin';
import blogReducer, {STATE_KEY as BLOG_STATE_KEY} from './modules/blog';
import usersReducer, {STATE_KEY as USERS_STATE_KEY} from './modules/users';
import attachmentReducer, {
  STATE_KEY as ATTACHMENT_STATE_KEY,
} from './modules/attachments';
import mediaReducer from './modules/media';

import notificationReducer from './modules/notifications';
import entitiesReducer from './modules/entities';

const rootReducer = combineReducers({
  [BOLDR_STATE_KEY]: boldrReducer,
  [BLOG_STATE_KEY]: blogReducer,
  [USERS_STATE_KEY]: usersReducer,
  [AUTH_STATE_KEY]: authReducer,
  [ADMIN_STATE_KEY]: adminReducer,
  [ATTACHMENT_STATE_KEY]: attachmentReducer,
  media: mediaReducer,
  notifications: notificationReducer,
  entities: entitiesReducer,
  form: formReducer,
  routing,
});

export default rootReducer;
