import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import { routerReducer } from 'react-router-redux';
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
import appReducer from './modules/app';

export default function getReducers(apolloClient) {
  return combineReducers({
    apollo: apolloClient.reducer(),
    app: appReducer,
    boldr: boldrReducer,
    blog: blogReducer,
    users: usersReducer,
    auth: authReducer,
    admin: adminReducer,
    media: mediaReducer,
    notifications: notificationReducer,
    entities: entitiesReducer,
    form: formReducer,
    router: routerReducer,
  });
}
