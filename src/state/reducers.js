import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import { routerReducer } from '../core/RouterConnection';
// internal reducers
import blogReducer from '../scenes/Blog/state/reducer';
import adminReducer from '../scenes/Admin/state/reducer';
import authReducer from '../scenes/Account/state/reducer';
import boldrReducer from './boldr/reducer';
import notificationsReducer from './notifications/notifications';

export default function getReducers(apolloClient) {
  return combineReducers({
    apollo: apolloClient.reducer(),
    boldr: boldrReducer,
    blog: blogReducer,
    auth: authReducer,
    admin: adminReducer,
    notifications: notificationsReducer,
    form: formReducer,
    router: routerReducer,
  });
}
