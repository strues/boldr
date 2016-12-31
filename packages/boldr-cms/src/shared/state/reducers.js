import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import { routerReducer as routing } from 'react-router-redux';

import accountReducer, { STATE_KEY as ACCOUNT_STATE_KEY } from '../scenes/Account/reducer';
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
    [ACCOUNT_STATE_KEY]: accountReducer,
    blog: blogReducer,
    auth: authReducer,
    notifications: notificationReducer,
    routing,
    ...asyncReducers,
  });
}
