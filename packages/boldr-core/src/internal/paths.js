import path from 'path';
import fs from 'mz/fs';
import appRoot from 'boldr-utils/lib/node/appRoot';

function ensureSlash(path, needsSlash) {
  const hasSlash = path.endsWith('/');
  if (hasSlash && !needsSlash) {
    return path.substr(path, path.length - 1);
  } else if (!hasSlash && needsSlash) {
    return `${path}/`;
  } else {
    return path;
  }
}

/**
 * Path of the current working directory, with symlinks taken
 * into account.
 * @type {String}
 */
export const CWD = appRoot.get();

/**
 * Get the path from the user's project root
 * @param  {String} args the path we are trying to reach
 * @return {any}      whatever it is we're looking for
 */
function resolveProject(...args) {
  return path.resolve(CWD, ...args);
}

/**
 * Get the path from the root of the boldr-dx directory
 * @param  {String} args the path we are trying to reach
 * @return {any}      whatever it is we're looking for
 */
function resolveBoldr(...args) {
  return path.resolve(__dirname, '../..', ...args);
}

/**
 * Enables resolving paths via NODE_PATH. Shout out to create-react-app
 * https://github.com/facebookincubator/create-react-app/blob/master/packages/react-scripts/config/paths.js#L24
 * @type {String}
 */
const nodePaths = (process.env.NODE_PATH || '')
  .split(process.platform === 'win32' ? ';' : ':')
  .filter(Boolean)
  .filter(folder => !path.isAbsolute(folder))
  .map(resolveProject);

module.exports = {
  // eslint-disable-next-line
  nodePaths: nodePaths,
  dotEnvPath: resolveProject('.env'),
  boldrConfig: resolveProject('boldr.config.js'),
  boldrNodeModules: resolveBoldr('node_modules'),
  projectNodeModules: resolveProject('node_modules'),
  srcDir: resolveProject('src'),
  boldrDir: resolveProject('.boldr'),
  clientOutputPath: resolveProject('.boldr/compiled/client'),
  serverOutputPath: resolveProject('.boldr/compiled/server'),
  serverEntry: resolveBoldr('lib/framework/server/entry.js'),
  adminDir: resolveProject('src/shared/scenes/Admin'),
  blogDir: resolveProject('src/shared/scenes/Blog'),
  componentsDir: resolveProject('src/shared/components'),
  scenesDir: resolveProject('src/shared/scenes'),
  stateDir: resolveProject('src/shared/state'),
  coreDir: resolveProject('src/shared/core'),
  tmplDir: resolveProject('src/shared/templates'),
  projectPkg: resolveProject('package.json'),
  cacheDir: resolveProject('node_modules/.boldr_cache'),
};
