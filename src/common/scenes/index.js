import BoldrWrapper from './BoldrWrapper';
import Account from './Account';
import Blog from './Blog';
import Dashboard from './Dashboard';

if (typeof require.ensure !== 'function') require.ensure = (deps, cb) => cb(require);

const errorLoading = (err) => {
  console.error('Dynamic page loading failed', err); // eslint-disable-line no-console
};

const loadModule = (cb) => (componentModule) => {
  cb(null, componentModule.default);
};

export default (store) => {
  const connect = (fn) => (nextState, replaceState) => fn(store, nextState, replaceState);

  return {
    path: '/',
    component: BoldrWrapper,
    indexRoute: {
      component: require('./Home').default,
    },
    childRoutes: [
      Account(store, connect),
      Blog(store, connect),
      Dashboard(store, connect),
      {
        path: 'about',
        getComponent(nextState, cb) {
          System.import('./About')
            .then(loadModule(cb))
            .catch(errorLoading);
        },
      },
      {
        path: '*',
        getComponent(location, cb) {
          System.import('./Error404')
            .then(loadModule(cb))
            .catch(errorLoading);
        },
      },
    ],
  };
};
