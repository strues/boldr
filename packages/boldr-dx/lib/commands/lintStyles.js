'use strict';

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _glob = require('glob');

var _glob2 = _interopRequireDefault(_glob);

var _stylelint = require('stylelint');

var _stylelint2 = _interopRequireDefault(_stylelint);

var _logger = require('boldr-utils/lib/logger');

var _logger2 = _interopRequireDefault(_logger);

var _paths = require('../config/paths');

var _paths2 = _interopRequireDefault(_paths);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _newArrowCheck(innerThis, boundThis) { if (innerThis !== boundThis) { throw new TypeError("Cannot instantiate an arrow function"); } }

module.exports = function () {
  _newArrowCheck(undefined, undefined);

  var handleError = function (error) {
    _newArrowCheck(undefined, undefined);

    _logger2.default.error(error);
    process.exit(1);
  }.bind(undefined);

  var stylelintrc = _glob2.default.sync(String(_paths2.default.rootDir) + '/.*stylelintrc*');
  var configFile = stylelintrc.length ? stylelintrc[0] : _path2.default.join(__dirname, '../config/stylelintrc.base');

  _logger2.default.info('Using Stylelint file: ' + String(configFile));

  _stylelint2.default.lint({
    files: [String(_paths2.default.sharedDir) + '/**/*.css', String(_paths2.default.sharedDir) + '/**/*.scss'],
    formatter: 'string',
    configFile: configFile
  }).then(function (result) {
    _newArrowCheck(undefined, undefined);

    if (result.output) {
      handleError('\n' + String(result.output));
    } else {
      _logger2.default.end('Looking so damn stylish 🏆');
      process.exit(0);
    }
  }.bind(undefined)).catch(function (error) {
    _newArrowCheck(undefined, undefined);

    handleError(error.stack);
  }.bind(undefined));
}.bind(undefined);