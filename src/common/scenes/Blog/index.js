import { getAsyncInjectors } from 'core/index';
import BlogContainer from './BlogContainer';

const errorLoading = (err) => {
  console.error('Dynamic page loading failed', err); // eslint-disable-line no-console
};

const loadModule = (cb) => (componentModule) => {
  cb(null, componentModule.default);
};

export default (store, connect) => {
  const { injectReducer } = getAsyncInjectors(store);
  return {
    path: 'blog',
    component: BlogContainer,
    indexRoute: {
      getComponent(nextState, cb) {
        const importModules = Promise.all([
          // System.import('./reducer'),
          System.import('./PostListing'),
        ]);
        const renderRoute = loadModule(cb);
        importModules.then(([component]) => {
          // injectReducer('blog', reducer.default);
          renderRoute(component);
        });

        importModules.catch(errorLoading);
      },
    },
    childRoutes: [{
      path: ':slug',
      getComponent(nextState, cb) {
        System.import('./SinglePost')
        .then(loadModule(cb))
        .catch(errorLoading);
      },
    }, {
      path: 'tags/:name',
      getComponent(nextState, cb) {
        System.import('./TagList')
        .then(loadModule(cb))
        .catch(errorLoading);
      },
    }],
  };
};
