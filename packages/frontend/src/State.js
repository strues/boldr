import { reducer as formReducer } from 'redux-form';
import blogReducer from './scenes/Blog/state/reducer';
import adminReducer from './scenes/Admin/state/reducer';
import authReducer from './scenes/Account/state/reducer';

export default {
  getRoutes() {
    return [];
  },
  getEnhancers() {
    return [];
  },
  getReducers() {
    return {
      form: formReducer,
      blog: blogReducer,
      auth: authReducer,
      admin: adminReducer,
    };
  },
  getMiddlewares() {
    return [];
  },
};
