import { combineReducers } from 'redux';
import { routerReducer as routing } from 'react-router-redux';
import { reducer as formReducer } from 'redux-form';
import notificationReducer from './dux/notifications';
import entitiesReducer from './dux/entities';
import authReducer from './dux/auth';
import boldrReducer from './dux/boldr';
import postReducer from './dux/post';
import uiReducer from './dux/ui';

export default function createReducer(asyncReducers) {
  return combineReducers({
    notifications: notificationReducer,
    auth: authReducer,
    posts: postReducer,
    boldr: boldrReducer,
    ui: uiReducer,
    form: formReducer,
    routing,
    ...asyncReducers,
  });
}
