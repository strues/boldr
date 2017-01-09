'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _api = require('../config/api');

var _api2 = _interopRequireDefault(_api);

var _errors = require('./core/errors');

var _middleware = require('./core/middleware');

var _index = require('./routes/index');

var _index2 = _interopRequireDefault(_index);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var app = (0, _express2.default)();

// contains body-parser, method-override, etc...

(0, _middleware.expressMiddleware)(app);
// contains cookie-parser, passport, jwt, session
(0, _middleware.authMiddleware)(app);
app.use((0, _middleware.rbac)());
// attaches to router
app.use(_api2.default.prefix, _index2.default);

// catch 404 and forward response to errorhandler
/* istanbul ignore next */
app.use(function (req, res, next) {
  var err = new _errors.NotFound();
  return next(err);
});

// catch everything else in this errorhandler and send a stacktrace in development.
// $FlowIssue
app.use(function (err, req, res, next) {
  // eslint-disable-line no-unused-vars
  /* istanbul ignore next */
  var status = err.status || 500;
  var type = err.type || 'UnknownError';
  var message = err.message || 'Something went wrong.';
  // $FlowIssue
  res.status(status);
  /* istanbul ignore next */
  res.send({ type: type, message: message, stack: process.env.NODE_ENV === 'development' ? err.stack : {} });
});

exports.default = app;