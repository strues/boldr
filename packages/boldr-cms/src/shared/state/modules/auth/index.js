import authReducer from './auth';
import { signup, login, logout, checkAuth, forgotPassword, resetPassword, verifyAccount } from './actions';

export default authReducer;
export {
  signup, login, logout, checkAuth, forgotPassword, resetPassword, verifyAccount,
};
