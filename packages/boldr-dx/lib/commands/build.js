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

function _newArrowCheck(innerThis, boundThis) { if (innerThis !== boundThis) { throw new TypeError("Cannot instantiate an arrow function"); } }

function task(args, options) {
  var _this = this;

  _logger2.default.info('Loading configuration.');
  var engine = new _engine2.default();
  engine.build().then(function () {
    _newArrowCheck(this, _this);

    _logger2.default.end('Build finished successfully.');
    process.exit(0);
  }.bind(this), function (err) {
    _newArrowCheck(this, _this);

    _logger2.default.error('Build task failed...');
    _logger2.default.error(err);
    process.exit(1);
  }.bind(this));
}

function register(program) {
  program.command('build', 'Compile the browser and server bundles for production.').action(task);
}

exports.default = { register: register };