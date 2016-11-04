import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import { reducer as reduxAsyncConnect } from 'redux-connect';
import { reducer as formReducer } from 'redux-form';
import notificationReducer from './dux/notifications';
import entitiesReducer from './dux/entities';
import authReducer from './dux/auth';
import boldrReducer from './dux/boldr';
import postReducer from './dux/post';
import tagReducer from './dux/tag';

export default function createReducer(asyncReducers) {
  return combineReducers({
    routing: routerReducer,
    reduxAsyncConnect,
    notifications: notificationReducer,
    entities: entitiesReducer,
    auth: authReducer,
    posts: postReducer,
    boldr: boldrReducer,
    tags: tagReducer,
    form: formReducer,
    ...asyncReducers,
  });
}
