import { loadRoute, errorLoading } from '../../core/utils';
import Account from './Account';

export default (store) => {
  /* istanbul ignore next */
  return {
    path: 'account',
    component: Account,
    childRoutes: [{
      path: 'forgot-password',
      getComponent(nextState, cb) {
        import('./ForgotPassword')
        .then(loadRoute(cb))
        .catch(errorLoading);
      },
    },
    {
      path: 'login',
      getComponent(nextState, cb) {
        import('./Login')
        .then(loadRoute(cb))
        .catch(errorLoading);
      },
    },
    {
      path: 'reset-password/:token',
      getComponent(nextState, cb) {
        import('./ResetPassword')
        .then(loadRoute(cb))
        .catch(errorLoading);
      },
    },
    {
      path: 'verify/:token',
      getComponent(nextState, cb) {
        import('./Verify')
        .then(loadRoute(cb))
        .catch(errorLoading);
      },
    },
    {
      path: 'signup',
      getComponent(nextState, cb) {
        import('./Signup')
        .then(loadRoute(cb))
        .catch(errorLoading);
      },
    }],
  };
};
