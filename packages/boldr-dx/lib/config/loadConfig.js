'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

var path = require('path');
var appRoot = require('boldr-utils/lib/node/appRoot');
var debug = require('debug')('boldr:dx:config:loadConfig');

var defaultConfig = require('./defaultConfig');

module.exports = function loadConfig(engine) {
  try {
    var configModulePath = engine.getConfigPath();
    var inputOpts = engine.getInputOptions();
    // first clean up require cache so we always load fresh config
    delete require.cache[configModulePath];
    // then require the fresh config
    var config = require(configModulePath); // eslint-disable-line global-require

    debug('Loaded fresh config values');

    return {
      env: _extends({}, defaultConfig.env, config.env || {}),
      plugins: [].concat(_toConsumableArray(defaultConfig.plugins), _toConsumableArray(config.plugins || [])),
      bundle: _extends({}, defaultConfig.bundle, config.bundle)
    };
  } catch (e) {
    return defaultConfig;
  }
};