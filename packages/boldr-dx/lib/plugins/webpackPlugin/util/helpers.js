'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.postCssConfig = exports.envAnalyze = exports.envVerbose = exports.envDebug = exports.envProd = exports.envDev = undefined;

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var envDev = exports.envDev = process.env.NODE_ENV === 'development';
var envProd = exports.envProd = process.env.NODE_ENV === 'production';
var envDebug = exports.envDebug = process.env.BOLDR_DEBUG === 'true';
var envVerbose = exports.envVerbose = process.env.BOLDR_VERBOSE === 'true';
var envAnalyze = exports.envAnalyze = process.env.BOLDR_ANALYZE === 'true';

var postCssConfig = exports.postCssConfig = require(_path2.default.resolve(__dirname, 'postcss.config.js'));