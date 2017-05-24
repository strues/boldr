import authReducer from './reducer';
import { doSignup, doLogin, logout, checkAuth } from './actions';
import { selectAuth } from './selectors';

export default authReducer;

export { authReducer, doSignup, doLogin, logout, checkAuth, selectAuth };
