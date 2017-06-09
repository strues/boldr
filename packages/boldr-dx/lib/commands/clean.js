'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _fsExtra = require('fs-extra');

var _fsExtra2 = _interopRequireDefault(_fsExtra);

var _logger = require('boldr-utils/lib/logger');

var _logger2 = _interopRequireDefault(_logger);

var _engine = require('../engine');

var _engine2 = _interopRequireDefault(_engine);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function clean(config) {
  var rootDir = process.cwd();
  _fsExtra2.default.removeSync(String(rootDir) + '/node_modules/.cache/');
  _fsExtra2.default.removeSync(config.bundle.assetsDir);
  _fsExtra2.default.removeSync(config.bundle.server.bundleDir);
  _fsExtra2.default.removeSync(config.bundle.assetsDir);
}

function cleanInput(directory) {
  var rootDir = process.cwd();
  _fsExtra2.default.removeSync(String(rootDir) + '/' + String(directory));
}

function task(args, options) {
  _logger2.default.task('Cleaning up');
  var engine = new _engine2.default(_fsExtra2.default.realpathSync(process.cwd()), undefined);
  var config = engine.getConfiguration();
  clean(config);

  var directory = options.directory;

  if (directory) {
    cleanInput(directory);
  }
  _logger2.default.end('Removed cache, built client files, and compiled server.');
}

function register(program) {
  program.command('clean', 'Remove files or directories.').help('By default, cache, assets dir and the compiled server are removed.').option('-d, --directory [dir]', 'Path from current working directory to the directory or file to remove.').action(task);
}

exports.default = { register: register };