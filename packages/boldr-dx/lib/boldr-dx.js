#!/usr/bin/env node
'use strict';

var _caporal = require('caporal');

var _caporal2 = _interopRequireDefault(_caporal);

var _updateNotifier = require('update-notifier');

var _updateNotifier2 = _interopRequireDefault(_updateNotifier);

var _logger = require('boldr-utils/lib/logger');

var _logger2 = _interopRequireDefault(_logger);

var _debug2 = require('debug');

var _debug3 = _interopRequireDefault(_debug2);

var _package = require('../package.json');

var _package2 = _interopRequireDefault(_package);

var _dev = require('./commands/dev');

var _dev2 = _interopRequireDefault(_dev);

var _clean = require('./commands/clean');

var _clean2 = _interopRequireDefault(_clean);

var _build = require('./commands/build');

var _build2 = _interopRequireDefault(_build);

var _createUser = require('./commands/createUser');

var _createUser2 = _interopRequireDefault(_createUser);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _newArrowCheck(innerThis, boundThis) { if (innerThis !== boundThis) { throw new TypeError("Cannot instantiate an arrow function"); } }
/* eslint-disable flowtype/no-types-missing-file-annotation */


var debug = (0, _debug3.default)('boldr:dx:dx');
// @TODO: Remove this once babel-loader updates
// https://github.com/babel/babel-loader/pull/391
// $FlowIssue
process.noDeprecation = true;

(0, _updateNotifier2.default)({ pkg: _package2.default }).notify();

_caporal2.default.STRING = function (value) {
  _newArrowCheck(undefined, undefined);

  return typeof value === 'string' ? value : null;
}.bind(undefined);
_caporal2.default.version(_package2.default.version).description('Boldr developer tools.');

_build2.default.register(_caporal2.default);
_clean2.default.register(_caporal2.default);
_dev2.default.register(_caporal2.default);
_createUser2.default.register(_caporal2.default);

_caporal2.default.parse(process.argv);