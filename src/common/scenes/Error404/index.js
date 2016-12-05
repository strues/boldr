/* @flow */

const errorLoading = (err) => {
  console.error('Dynamic page loading failed', err); // eslint-disable-line no-console
};

const loadModule = (cb) => (componentModule) => {
  cb(null, componentModule.default);
};

export default {
  path: '*',
  getComponent(location: Object, cb: Function) {
    System.import('./Error404')
      .then(loadModule(cb))
      .catch(errorLoading);
  },
};
