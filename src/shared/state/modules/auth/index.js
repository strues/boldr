import authReducer, { STATE_KEY as AUTH_STATE_KEY } from './reducer';
import { doSignup, doLogin, logout, checkAuth } from './actions';
import { selectAuth } from './selectors';

export default authReducer;

export {
  authReducer,
  AUTH_STATE_KEY,
  doSignup,
  doLogin,
  logout,
  checkAuth,
  selectAuth,
};
