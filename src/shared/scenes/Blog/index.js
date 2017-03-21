import { loadRoute, errorLoading } from 'boldr-utils';
import BlogContainer from './BlogContainer';
import PostListingContainer from './PostListing/PostListingContainer';

export default (store) => {
  /* istanbul ignore next */
  return {
    path: 'blog',
    component: BlogContainer,
    indexRoute: {
      component: PostListingContainer,
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
