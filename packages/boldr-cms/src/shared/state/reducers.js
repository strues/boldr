import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import { routerReducer as routing } from 'react-router-redux';
import authReducer from './modules/auth';
import boldrReducer from './modules/boldr';
import blogReducer from './modules/blog';
import notificationReducer from './modules/notifications';
import entities from './modules/entities';

export default function createReducer(asyncReducers) {
  return combineReducers({
    form: formReducer,
    entities,
    boldr: boldrReducer,
    blog: blogReducer,
    auth: authReducer,
    notifications: notificationReducer,
    routing,
    ...asyncReducers,
  });
}
