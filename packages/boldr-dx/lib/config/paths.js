'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

function _newArrowCheck(innerThis, boundThis) { if (innerThis !== boundThis) { throw new TypeError("Cannot instantiate an arrow function"); } }

/* eslint-disable object-shorthand */
var fs = require('fs');
var path = require('path');
var appRoot = require('boldr-utils/lib/node/appRoot');

/**
 * Path of the current working directory, with symlinks taken
 * into account.
 * @type {String}
 */
var cwd = exports.cwd = appRoot.get();

/**
 * Get the path from the user's project root
 * @param  {String} args the path we are trying to reach
 * @return {any}      whatever it is we're looking for
 */
function resolveProject() {
  for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
    args[_key] = arguments[_key];
  }

  return path.resolve.apply(path, [cwd].concat(args));
}

/**
 * Get the path from the root of the boldr-dx directory
 * @param  {String} args the path we are trying to reach
 * @return {any}      whatever it is we're looking for
 */
function resolveBoldr() {
  for (var _len2 = arguments.length, args = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
    args[_key2] = arguments[_key2];
  }

  return path.resolve.apply(path, [__dirname, '../..'].concat(args));
}

/**
 * Enables resolving paths via NODE_PATH. Shout out to create-react-app
 * https://github.com/facebookincubator/create-react-app/blob/master/packages/react-scripts/config/paths.js#L24
 * @type {String}
 */
var nodePaths = (process.env.NODE_PATH || '').split(process.platform === 'win32' ? ';' : ':').filter(Boolean).filter(function (folder) {
  _newArrowCheck(undefined, undefined);

  return !path.isAbsolute(folder);
}.bind(undefined)).map(resolveProject);

module.exports = {
  nodePaths: nodePaths,
  dotEnvPath: resolveProject('.env'),
  boldrNodeModules: resolveBoldr('node_modules'),
  projectNodeModules: resolveProject('node_modules'),
  adminDir: resolveProject('src/shared/scenes/Admin'),
  blogDir: resolveProject('src/shared/scenes/Blog'),
  componentsDir: resolveProject('src/shared/components'),
  scenesDir: resolveProject('src/shared/scenes'),
  stateDir: resolveProject('src/shared/state'),
  coreDir: resolveProject('src/shared/core'),
  tmplDir: resolveProject('src/shared/templates'),
  projectPkg: resolveProject('package.json'),
  cacheDir: resolveProject('node_modules/.boldr_cache')
};