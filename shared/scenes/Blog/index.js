import { loadRoute, errorLoading } from '../../core/utils';
import BlogContainer from './BlogContainer';

export default (store) => {
  /* istanbul ignore next */
  return {
    path: 'blog',
    component: BlogContainer,
    indexRoute: {
      getComponent(nextState, cb) {
        import('./PostListing/PostListingContainer')
        .then(loadRoute(cb))
        .catch(errorLoading);
      },
    },
    childRoutes: [{
      path: ':slug',
      getComponent(nextState, cb) {
        import('./SinglePost')
        .then(loadRoute(cb))
        .catch(errorLoading);
      },
    }, {
      path: 'tags/:name',
      getComponent(nextState, cb) {
        import('./TagList')
        .then(loadRoute(cb))
        .catch(errorLoading);
      },
    }],
  };
};
