'use strict';

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _shelljs = require('shelljs');

var _shelljs2 = _interopRequireDefault(_shelljs);

var _glob = require('glob');

var _glob2 = _interopRequireDefault(_glob);

var _logger = require('boldr-utils/lib/logger');

var _logger2 = _interopRequireDefault(_logger);

var _paths = require('../config/paths');

var _paths2 = _interopRequireDefault(_paths);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _newArrowCheck(innerThis, boundThis) { if (innerThis !== boundThis) { throw new TypeError("Cannot instantiate an arrow function"); } }

module.exports = function (config, flags) {
  _newArrowCheck(undefined, undefined);

  var eslintrc = _glob2.default.sync(String(_paths2.default.rootDir) + '/.*eslintrc*');
  var configFile = eslintrc.length ? eslintrc[0] : _path2.default.join(__dirname, '../config/eslintrc.base');

  _logger2.default.info('Using ESLint file: ' + String(configFile));

  var lint = function () {
    _newArrowCheck(undefined, undefined);

    var esLintLibrary = require.resolve('eslint');
    var eslint = esLintLibrary.replace(/(.*)(lib\/api\.js)/, '$1bin/eslint.js'); // eslint-disable-line

    var cmd = String(eslint) + ' src/ -c ' + String(configFile) + ' --color ' + String(flags.join(' '));
    var output = _shelljs2.default.exec(cmd);

    if (output.code === 0) {
      _logger2.default.end('Linting complete. ' + (output.stdout === '' ? 'Damn, your code is beautiful  💕' : 'Maybe you want to check it over again  😦'));
    }
    process.exit(output.code > 0 ? 1 : 0);
  }.bind(undefined);
  lint();
}.bind(undefined);