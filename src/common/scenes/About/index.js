/* @flow */

const errorLoading = (err) => {
  console.error('Dynamic page loading failed', err); // eslint-disable-line no-console
};

const loadModule = (cb) => (componentModule) => {
  cb(null, componentModule.default);
};

export default {
  path: 'about',
  getComponent(nextState: Object, cb: Function) {
    System.import('./About')
      .then(loadModule(cb))
      .catch(errorLoading);
  },
};
