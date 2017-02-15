import usersReducer, { STATE_KEY } from './reducer';

import {
  forgotPassword,
  resetPassword,
  verifyAccount,
  getProfile,
  editProfile,
} from './actions';

import {
  selectMe,
  selectUsers,
  selectProfile,
  makeSelectCurrentProfile,
  makeSelectUser,
} from './selectors';

export default usersReducer;

export {
  usersReducer,
  STATE_KEY,
  selectMe,
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
