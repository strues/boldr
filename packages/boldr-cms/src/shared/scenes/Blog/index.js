import { getAsyncInjectors, loadRoute, errorLoading } from '../../core/utils';
import BlogContainer from './BlogContainer';

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
        const renderRoute = loadRoute(cb);
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
        .then(loadRoute(cb))
        .catch(errorLoading);
      },
    // }, {
    //   path: 'tags/:name',
    //   getComponent(nextState, cb) {
    //     System.import('./TagList')
    //     .then(loadRoute(cb))
    //     .catch(errorLoading);
    //   },
    }],
  };
};
