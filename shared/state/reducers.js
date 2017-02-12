import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import { routerReducer as routing } from 'react-router-redux';

import accountReducer, { STATE_KEY as ACCOUNT_STATE_KEY } from './modules/account';
import boldrReducer, { STATE_KEY as BOLDR_STATE_KEY } from './modules/boldr';
import blogReducer, { STATE_KEY as BLOG_STATE_KEY } from './modules/blog';
import notificationReducer from './modules/notifications';
import entities from './modules/entities';


export default function createReducer(asyncReducers) {
  return combineReducers({
    [BOLDR_STATE_KEY]: boldrReducer,
    [ACCOUNT_STATE_KEY]: accountReducer,
    [BLOG_STATE_KEY]: blogReducer,
    notifications: notificationReducer,
    entities,
    form: formReducer,
    routing,
    ...asyncReducers,
  });
}
