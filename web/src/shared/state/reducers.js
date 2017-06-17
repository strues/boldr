import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import { routerReducer } from 'react-router-redux';
import { blogReducer } from '../scenes/Blog/state';
import { adminReducer } from '../scenes/Admin/state';
import { authReducer } from '../scenes/Account/state';
import { boldrReducer, usersReducer, notificationReducer } from './modules';

export default function getReducers(apolloClient) {
  return combineReducers({
    apollo: apolloClient.reducer(),
    boldr: boldrReducer,
    blog: blogReducer,
    users: usersReducer,
    auth: authReducer,
    admin: adminReducer,
    notifications: notificationReducer,
    form: formReducer,
    router: routerReducer,
  });
}
