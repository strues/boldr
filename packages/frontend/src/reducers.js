import { reducer as formReducer } from 'redux-form';
import blogReducer from './scenes/Blog/state/reducer';
import adminReducer from './scenes/Admin/state/reducer';
import authReducer from './scenes/Account/state/reducer';

const rootReducer = {
  // map additional reducers here
  form: formReducer,
  blog: blogReducer,
  auth: authReducer,
  admin: adminReducer,
};

export default rootReducer;
