'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _objection = require('objection');

var _postgres = require('../services/postgres');

var _postgres2 = _interopRequireDefault(_postgres);

var _setting = require('../routes/setting/setting.model');

var _setting2 = _interopRequireDefault(_setting);

var _logger = require('./logger');

var _logger2 = _interopRequireDefault(_logger);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Bootstrap
 * src/api/core/bootstrap
 * Establishes a connection to the database, verifies it, and binds our db models.
 * Verifies application-wide configuration.
 */
var startupMessage = '\n\n  ------------------------------------------------------------ \n\n                  \uD83D\uDE80 Loaded BoldrAPI Configuration.\n  ------------------------------------------------------------- \n\n  ';

var bootstrap = function () {
  function bootstrap() {
    (0, _classCallCheck3.default)(this, bootstrap);
  }

  (0, _createClass3.default)(bootstrap, null, [{
    key: 'init',
    value: function init() {
      this.initConfig();
      this.initDb();
      this.validateEnvVars();
    }
  }, {
    key: 'initConfig',
    value: function initConfig() {
      _logger2.default.info(startupMessage);
    }
  }, {
    key: 'validateEnvVars',
    value: function validateEnvVars() {
      this.validateNodeEnv();
    }
  }, {
    key: 'validateNodeEnv',
    value: function validateNodeEnv() {
      // Check to see that the `process.env.NODE_ENV has been
      // set to an appropriate value of `development`, `production`
      // or `test`. If not, alert the user and default to `development`

      switch (process.env.NODE_ENV) {
        case 'development':
          _logger2.default.info('\u2733\uFE0F  Node environment set for ' + process.env.NODE_ENV);
          break;

        case 'production':
          _logger2.default.info('\u2733\uFE0F  Node environment set for ' + process.env.NODE_ENV);
          break;

        case 'test':
          _logger2.default.info('\u2733\uFE0F  Node environment set for ' + process.env.NODE_ENV);
          break;

        default:
          _logger2.default.error('Error: process.env.NODE_ENV should be set to a valid ' + ' value such as \'production\', \'development\', or \'test\'.');
          _logger2.default.info('Value received: ' + process.env.NODE_ENV);
          _logger2.default.info('Defaulting value for: development');
          process.env.NODE_ENV = 'development';
          break;
      }

      return;
    }
  }, {
    key: 'initDb',
    value: function initDb() {
      _logger2.default.info('initDb: Binding to Knex instance and making a test query.');
      // bind Objection models to db instance.
      _objection.Model.knex(_postgres2.default);
      _setting2.default.query().count('*').catch(function (e) {
        _logger2.default.error('Query failed', { error: e.message, stack: e.stack });
      });
    }
  }]);
  return bootstrap;
}();

exports.default = bootstrap;