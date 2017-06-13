'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _webpack = require('webpack');

var _webpack2 = _interopRequireDefault(_webpack);

var _debug2 = require('debug');

var _debug3 = _interopRequireDefault(_debug2);

var _logger = require('boldr-utils/lib/logger');

var _logger2 = _interopRequireDefault(_logger);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _newArrowCheck(innerThis, boundThis) { if (innerThis !== boundThis) { throw new TypeError("Cannot instantiate an arrow function"); } }

var debug = (0, _debug3.default)('boldr:dx:webpack:createSingleCompiler');
/**
 * Exactly like its name, this function starts webpack, runs it and resolves
 * @param  {Object} webpackConfig webpack configuration
 * @return {Promise}               the buid will finish, or reject
 */
function createSingleCompiler(webpackConfig) {
  var _this = this;

  return new Promise(function (resolve, reject) {
    _newArrowCheck(this, _this);

    (0, _webpack2.default)(webpackConfig, function (err, stats) {
      _newArrowCheck(this, _this);

      if (err || stats.hasErrors()) {
        debug(err);
        return reject(err);
      }

      return resolve();
    }.bind(this));
  }.bind(this));
}

exports.default = createSingleCompiler;