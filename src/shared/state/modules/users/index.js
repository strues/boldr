import usersReducer, { STATE_KEY as USERS_STATE_KEY } from './reducer';

import {
  fetchProfile,
  fetchProfileIfNeeded,
  forgotPassword,
  resetPassword,
  verifyAccount,
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
  USERS_STATE_KEY,
  fetchProfileIfNeeded,
  fetchProfile,
  selectMe,
  forgotPassword,
  resetPassword,
  verifyAccount,
  editProfile,
  selectUsers,
  selectProfile,
  makeSelectCurrentProfile,
  makeSelectUser,
};
