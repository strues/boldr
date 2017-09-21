import { reducer as formReducer } from 'redux-form';
import blogReducer from './scenes/Blog/state/reducer';
import adminReducer from './scenes/Admin/state/reducer';
import authReducer from './scenes/Account/state/reducer';

export default {
  /**
   * Return map of routes. Match redux actions to urls.
   */
  getRoutes() {},

  /**
   * Return list of Redux store enhancers to use.
   */
  getEnhancers() {
    return [];
  },

  /**
   * Create mapping of reducers to use for the Redux store.
   */
  getReducers() {
    return {
      form: formReducer,
      blog: blogReducer,
      auth: authReducer,
      admin: adminReducer,
    };
  },

  /**
   * Create list of Redux middleware to use.
   */
  getMiddlewares() {
    return [];
  },
};
