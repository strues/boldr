'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _appRoot = require('boldr-utils/lib/node/appRoot');

var _appRoot2 = _interopRequireDefault(_appRoot);

var _logger = require('boldr-utils/lib/logger');

var _logger2 = _interopRequireDefault(_logger);

var _engine = require('../engine');

var _engine2 = _interopRequireDefault(_engine);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _newArrowCheck(innerThis, boundThis) { if (innerThis !== boundThis) { throw new TypeError("Cannot instantiate an arrow function"); } }

function task(args, options) {
  var _this = this;

  _logger2.default.info('Loading configuration.');
  var cwd = _appRoot2.default.get();
  var engine = new _engine2.default(cwd);
  engine.dev().catch(function (e) {
    _newArrowCheck(this, _this);

    _logger2.default.error(e);
    process.exit(1);
  }.bind(this));
  process.on('SIGINT', function () {
    _newArrowCheck(this, _this);

    engine.stop();
  }.bind(this));
}

function register(program) {
  program.command('dev', 'Launch the development process.').option('-p, --port <num>', 'Dev server port', program.INT, 1).action(task);
}

exports.default = { register: register };