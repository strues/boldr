'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _awsSdk = require('aws-sdk');

var _awsSdk2 = _interopRequireDefault(_awsSdk);

var _api = require('../../../config/api');

var _api2 = _interopRequireDefault(_api);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var opts = {
  accessKeyId: _api2.default.aws.keyId,
  secretAccessKey: _api2.default.aws.keySecret,
  region: _api2.default.aws.region
};

// all we do here is instantiate an S3 singleton that
// can be reused across the application.
var s3 = new _awsSdk2.default.S3(opts);

exports.default = s3;