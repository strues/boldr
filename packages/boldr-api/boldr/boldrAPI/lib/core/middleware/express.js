'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _typeof2 = require('babel-runtime/helpers/typeof');

var _typeof3 = _interopRequireDefault(_typeof2);

var _cors = require('cors');

var _cors2 = _interopRequireDefault(_cors);

var _bodyParser = require('body-parser');

var _bodyParser2 = _interopRequireDefault(_bodyParser);

var _methodOverride = require('method-override');

var _methodOverride2 = _interopRequireDefault(_methodOverride);

var _expressValidator = require('express-validator');

var _expressValidator2 = _interopRequireDefault(_expressValidator);

var _expressWinston = require('express-winston');

var _expressWinston2 = _interopRequireDefault(_expressWinston);

var _hpp = require('hpp');

var _hpp2 = _interopRequireDefault(_hpp);

var _api = require('../../../config/api');

var _api2 = _interopRequireDefault(_api);

var _logger = require('../logger');

var _logger2 = _interopRequireDefault(_logger);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (app) {
  app.disable('x-powered-by');
  app.set('trust proxy', 'loopback');
  // enable CORS - Cross Origin Resource Sharing
  // allow for sending credentials (auth token) in the headers.
  app.use((0, _cors2.default)({ origin: true, credentials: true }));
  // parse application/x-www-form-urlencoded
  app.use(_bodyParser2.default.urlencoded({ extended: true, limit: _api2.default.body.limit }));
  // parse application/anything+json
  app.use(_bodyParser2.default.json({ type: 'application/vnd.api+json', limit: _api2.default.body.limit }));
  // parse application/json
  app.use(_bodyParser2.default.json({ type: 'application/json', limit: _api2.default.body.limit }));
  // parse text/plain
  app.use(_bodyParser2.default.text({ type: 'text/plain', limit: _api2.default.body.limit }));
  // parse anything else
  app.use(_bodyParser2.default.raw({ limit: _api2.default.body.limit }));
  // must be right after bodyParser
  app.use((0, _expressValidator2.default)());
  app.use((0, _hpp2.default)());
  app.use((0, _methodOverride2.default)(function (req, res) {
    if (req.body && (0, _typeof3.default)(req.body) === 'object' && '_method' in req.body) {
      // look in urlencoded POST bodies and delete it
      var method = req.body._method;
      delete req.body._method;
      return method;
    }
  }));
  if (process.env.NODE_ENV === 'development' || process.env.NODE_ENV === 'test') {
    _expressWinston2.default.requestWhitelist.push('body');
    _expressWinston2.default.responseWhitelist.push('body');
    app.use(_expressWinston2.default.logger({
      winstonInstance: _logger2.default,
      meta: true, // optional: log meta data about request (defaults to true)
      msg: 'HTTP {{req.method}} {{req.url}} {{res.statusCode}} {{res.responseTime}}ms',
      colorStatus: true
    }));
  }
  if (process.env.NODE_ENV === 'development' || process.env.NODE_ENV === 'test') {
    app.use(_expressWinston2.default.errorLogger({
      winstonInstance: _logger2.default
    }));
  }
};