'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DEFAULT_CONTEXT = undefined;

var _appRoot = require('boldr-utils/lib/node/appRoot');

var _appRoot2 = _interopRequireDefault(_appRoot);

var _chalk = require('chalk');

var _chalk2 = _interopRequireDefault(_chalk);

var _paths = require('../../config/paths');

var _paths2 = _interopRequireDefault(_paths);

var _helpers = require('./util/helpers');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// import ProgressBarPlugin from 'progress-bar-webpack-plugin';
// import NpmInstallPlugin from 'npm-install-webpack-plugin';
var DEFAULT_CONTEXT = exports.DEFAULT_CONTEXT = _appRoot2.default.get();
// import webpack from 'webpack';
exports.default = {
  context: DEFAULT_CONTEXT,
  entry: {},
  output: {},
  resolve: {
    modules: ['node_modules', _paths2.default.projectNodeModules].concat(_paths2.default.nodePaths),
    extensions: ['.js', '.jsx', '.json']
  },
  resolveLoader: {
    modules: [_paths2.default.boldrNodeModules, _paths2.default.projectNodeModules]
  },
  stats: {},
  node: {},
  bail: _helpers.envProd,
  cache: _helpers.envDev,
  performance: {},
  externals: [],
  module: {
    noParse: [/\.min\.js/]
  }
};