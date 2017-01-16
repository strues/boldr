import { loadRoute, errorLoading } from '../../core/utils';

export default (store, connect) => ({

  path: 'account',
  component: require('./Account').default,
  childRoutes: [{
    path: 'forgot-password',
    getComponent(nextState, cb) {
      System.import('./ForgotPassword')
        .then(loadRoute(cb))
        .catch(errorLoading);
    },
  },
  {
    path: 'login',
    getComponent(nextState, cb) {
      System.import('./Login')
        .then(loadRoute(cb))
        .catch(errorLoading);
    },
  },
  {
    path: 'preferences',
    getComponent(nextState, cb) {
      System.import('./Preferences')
        .then(loadRoute(cb))
        .catch(errorLoading);
    },
  },
  {
    path: 'reset-password/:token',
    getComponent(nextState, cb) {
      require.ensure([
        './ResetPassword',
      ], (require) => {
        const ResetPage = require('./ResetPassword').default;

        cb(null, ResetPage);
      });
    },
  },
  {
    path: 'verify/:token',
    getComponent(nextState, cb) {
      require.ensure([
        './Verify',
      ], (require) => {
        const VerifyPage = require('./Verify').default;

        cb(null, VerifyPage);
      });
    },
  },
  {
    path: 'signup',
    getComponent(nextState, cb) {
      System.import('./Signup')
        .then(loadRoute(cb))
        .catch(errorLoading);
    },
  }],
});
