'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _logger = require('boldr-utils/lib/logger');

var _logger2 = _interopRequireDefault(_logger);

var _engine = require('../engine');

var _engine2 = _interopRequireDefault(_engine);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function task(args, options) {
  _logger2.default.info('Loading configuration.');
  var engine = new _engine2.default();
  // engine.build().then(
  //   () => {
  //     logger.end('Build finished successfully.');
  //     process.exit(0);
  //   },
  //   err => {
  //     logger.error('Build task failed...');
  //     logger.error(err);
  //     process.exit(1);
  //   },
  // );
}

function register(program) {
  program.command('create-user', 'Compile the browser and server bundles for production.').action(task);
}

exports.default = { register: register };