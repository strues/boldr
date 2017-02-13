import { combineReducers } from 'redux';
import profileReducer, { STATE_KEY as PROFILE_STATE_KEY } from './profile';
import authReducer, { STATE_KEY as AUTH_STATE_KEY } from './auth';
import userReducer, { STATE_KEY as USER_STATE_KEY } from './user';
import {
  doSignup,
  doLogin,
  logout,
  checkAuth,
  forgotPassword,
  resetPassword,
  verifyAccount,
  getProfile,
  editProfile,
} from './actions';
import {
  selectAuth,
  selectUser,
  selectProfile,
  makeSelectCurrentProfile,
  makeSelectAuth,
  makeSelectUser,
} from './selectors';

const STATE_KEY = 'account';

const accountReducer = combineReducers({
  [AUTH_STATE_KEY]: authReducer,
  [USER_STATE_KEY]: userReducer,
  [PROFILE_STATE_KEY]: profileReducer,
});

export default accountReducer;

export {
  STATE_KEY,
  doSignup,
  doLogin,
  logout,
  checkAuth,
  forgotPassword,
  resetPassword,
  verifyAccount,
  getProfile,
  editProfile,
  selectAuth,
  selectUser,
  selectProfile,
  makeSelectCurrentProfile,
  makeSelectAuth,
  makeSelectUser,
};
