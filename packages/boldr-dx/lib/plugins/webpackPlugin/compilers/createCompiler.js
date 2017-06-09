'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = createCompiler;

var _webpack = require('webpack');

var _webpack2 = _interopRequireDefault(_webpack);

var _logger = require('boldr-utils/lib/logger');

var _logger2 = _interopRequireDefault(_logger);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function createCompiler(config) {
  var compiler = void 0;
  try {
    compiler = (0, _webpack2.default)(config);
  } catch (e) {
    _logger2.default.error('Failed to compile.', e);
    process.exit(1);
  }
  return compiler;
}