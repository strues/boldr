/* @flow */
/**
 * Loads a route.
 *
 * @method loadRoute
 * @param  {Function} cb [description]
 * @return {[type]}      [description]
 */
const loadRoute = (cb: Function): Function => {
  return (module: Object): Function => cb(null, module.default);
};

/**
 * Error loading the view.
 *
 * @method errorLoading
 */
const errorLoading = () => {
  throw new Error('Error loading the view');
};

export {
  loadRoute,
  errorLoading,
};
