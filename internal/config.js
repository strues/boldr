const path = require('path');
const fs = require('fs');

/**
 * Path of the current working directory, with symlinks taken
 * into account.
 * @type {String}
 */
const rootDir = fs.realpathSync(process.cwd());

/**
 * Get the path from the user's project root
 * @param  {String} args the path we are trying to reach
 * @return {any}      whatever it is we're looking for
 */
function resolveProject(...args) {
  return path.resolve(rootDir, ...args);
}

/**
 * Enables resolving paths via NODE_PATH.
 * Shout out to create-react-app where this was borrowed
 * https://github.com/facebookincubator/create-react-app
 * @type {String}
 */
const nodePaths = (process.env.NODE_PATH || '')
  .split(process.platform === 'win32' ? ';' : ':')
  .filter(Boolean)
  .filter(folder => !path.isAbsolute(folder))
  .map(resolveProject);

module.exports = {
  serveAssetsFrom: '/assets/',
  serverPort: 3000,
  serverHost: 'localhost',
  isVerbose: true,
  isDebug: false,
  useBabili: true,
  nodeTarget: 'current',
  rootDir,
  nodePaths,
  // <PROJECT_ROOT>/node_modules
  nodeModules: resolveProject('node_modules'),
  // <PROJECT_ROOT>/package.json
  pkgPath: resolveProject('package.json'),
  srcDir: resolveProject('src'),
  serverEntry: resolveProject('src/core/entry/serverserver.js'),
  clientEntry: resolveProject('src/core/entry/client.js'),
  publicDir: resolveProject('public'),
  serverCompiledDir: resolveProject('build'),
  assetsDir: resolveProject('build/assets'),
  cacheDir: resolveProject('node_modules/.boldr_cache'),
  vendorFiles: [
    'apollo-client',
    'axios',
    '@boldr/ui',
    'classnames',
    'date-fns',
    'draft-convert',
    'draft-js',
    'draftjs-utils',
    'graphql-tag',
    'griddle-react',
    'lodash',
    'hoist-non-react-statics',
    'material-ui',
    'material-ui-icons',
    'prop-types',
    'react',
    'react-apollo',
    'react-dom',
    'react-helmet',
    'react-redux',
    'react-router-dom',
    'react-tap-event-plugin',
    'react-transition-group',
    'react-tagsinput',
    'react-motion',
    'data-driven-motion',
    'react-dropzone',
    'redux',
    'redux-form',
    'redux-thunk',
    'reselect',
    'serialize-javascript',
    'styled-components',
    'uuid',
    'webfontloader',
  ],
};
