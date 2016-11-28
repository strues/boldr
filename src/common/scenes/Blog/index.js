import BlogContainer from './BlogContainer';

const errorLoading = (err) => {
  console.error('Dynamic page loading failed', err); // eslint-disable-line no-console
};

const loadModule = (cb) => (componentModule) => {
  cb(null, componentModule.default);
};

export default (store, connect) => ({
  path: 'blog',
  component: BlogContainer,
  indexRoute: {
    component: require('./PostListing').default,
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
});
