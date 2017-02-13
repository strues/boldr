import usersReducer, { STATE_KEY } from './reducer';

import {
  forgotPassword,
  resetPassword,
  verifyAccount,
  getProfile,
  editProfile,
} from './actions';

import {
  selectUsers,
  selectProfile,
  makeSelectCurrentProfile,
  makeSelectUser,
} from './selectors';

export default usersReducer;

export {
  usersReducer,
  STATE_KEY,
  forgotPassword,
  resetPassword,
  verifyAccount,
  getProfile,
  editProfile,
  selectUsers,
  selectProfile,
  makeSelectCurrentProfile,
  makeSelectUser,
};
