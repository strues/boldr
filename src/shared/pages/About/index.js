import { loadRoute, errorLoading } from 'boldr-utils';

export default {
  path: 'about',
  getComponent(nextState: Object, cb: Function) {
    import('./About')
      .then(loadRoute(cb))
      .catch(errorLoading);
  },
};
