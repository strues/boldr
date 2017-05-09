const path = require('path');
const appRootDir = require('app-root-dir');


/**
 * Path of the current working directory, with symlinks taken
 * into account.
 * @type {String}
 */
const rootDir = appRootDir.get();

/**
 * Get the path from the user's project root
 * @param  {String} args the path we are trying to reach
 * @return {any}      whatever it is we're looking for
 */
function resolveProject(...args) {
  return path.resolve(rootDir, ...args);
}


module.exports = {
  src: resolveProject('src'),
  public: resolveProject('public'),
  assets: resolveProject('public/assets'),
  compiled: resolveProject('boldr'),
  publicPath: '/assets/',
  nodeModules: resolveProject('node_modules'),
  happy: resolveProject('.happypack'),
};
