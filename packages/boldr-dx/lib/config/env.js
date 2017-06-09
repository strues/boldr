'use strict';

function _newArrowCheck(innerThis, boundThis) { if (innerThis !== boundThis) { throw new TypeError("Cannot instantiate an arrow function"); } }

/*
 * This is pretty much line for line taken from Create React App because
 * it more than gets the job done. Thanks guys :)
 * https://github.com/facebookincubator/create-react-app
 */
var fs = require('fs');
var path = require('path');
var PATHS = require('./paths');

// Make sure that including paths.js after env.js will read .env variables.
delete require.cache[require.resolve('./paths')];
// eslint-disable-next-line
var NODE_ENV = process.env.NODE_ENV;
if (!NODE_ENV) {
  throw new Error('The NODE_ENV environment variable is required but was not specified.');
}

// https://github.com/bkeepers/dotenv#what-other-env-files-can-i-use
var dotenvFiles = [String(PATHS.dotEnvPath) + '.' + String(NODE_ENV) + '.local', String(PATHS.dotEnvPath) + '.' + String(NODE_ENV),
// Don't include `.env.local` for `test` environment
// since normally you expect tests to produce the same
// results for everyone
NODE_ENV !== 'test' && String(PATHS.dotEnvPath) + '.local', PATHS.dotEnvPath].filter(Boolean);

// Load environment variables from .env* files. Suppress warnings using silent
// if this file is missing. dotenv will never modify any environment variables
// that have already been set.
// https://github.com/motdotla/dotenv
dotenvFiles.forEach(function (dotenvFile) {
  _newArrowCheck(undefined, undefined);

  if (fs.existsSync(dotenvFile)) {
    require('dotenv').config({
      path: dotenvFile
    });
  }
}.bind(undefined));

var appDirectory = fs.realpathSync(process.cwd());
process.env.NODE_PATH = (process.env.NODE_PATH || '').split(path.delimiter).filter(function (folder) {
  _newArrowCheck(undefined, undefined);

  return folder && !path.isAbsolute(folder);
}.bind(undefined)).map(function (folder) {
  _newArrowCheck(undefined, undefined);

  return path.resolve(appDirectory, folder);
}.bind(undefined)).join(path.delimiter);

// Grab NODE_ENV and REACT_APP_* environment variables and prepare them to be
// injected into the application via DefinePlugin in Webpack configuration.
var BOLDR = /^BOLDR__/i;

function getClientEnvironment(publicUrl) {
  var _this = this;

  var raw = Object.keys(process.env).filter(function (key) {
    _newArrowCheck(this, _this);

    return BOLDR.test(key);
  }.bind(this)).reduce(function (env, key) {
    _newArrowCheck(this, _this);

    env[key] = process.env[key];
    return env;
  }.bind(this), {
    // Useful for determining whether we’re running in production mode.
    // Most importantly, it switches React into the correct mode.
    NODE_ENV: process.env.NODE_ENV || 'development'
  });
  // Stringify all values so we can feed into Webpack DefinePlugin
  var stringified = {
    'process.env': Object.keys(raw).reduce(function (env, key) {
      _newArrowCheck(this, _this);

      env[key] = JSON.stringify(raw[key]);
      return env;
    }.bind(this), {})
  };

  return { raw: raw, stringified: stringified };
}

module.exports = getClientEnvironment;