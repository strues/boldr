'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = S3Router;

var _uuid = require('uuid');

var _uuid2 = _interopRequireDefault(_uuid);

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _s = require('../../services/aws/s3');

var _s2 = _interopRequireDefault(_s);

var _api = require('../../../config/api');

var _api2 = _interopRequireDefault(_api);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var debug = require('debug')('boldrAPI:s3');

function checkTrailingSlash(path) {
  if (path && path[path.length - 1] !== '/') {
    path += '/';
  }
  return path;
}

function S3Router(options) {
  var S3_BUCKET = _api2.default.aws.bucket;
  var getFileKeyDir = options.getFileKeyDir || function () {
    return '';
  };

  if (!S3_BUCKET) {
    throw new Error('S3_BUCKET is required.');
  }

  var s3Options = {};
  if (options.region) {
    s3Options.region = options.region;
  }
  if (options.signatureVersion) {
    s3Options.signatureVersion = options.signatureVersion;
  }

  var router = _express2.default.Router();

  /**
   * Redirects image requests with a temporary signed URL, giving access
   * to GET an upload.
   */
  function tempRedirect(req, res, next) {
    _s2.default.getSignedUrl('getObject', {
      Bucket: S3_BUCKET,
      Key: checkTrailingSlash(getFileKeyDir(req)) + req.params[0]
    }, function (err, url) {
      if (err) {
        debug(err);
        return next(err);
      }
      res.redirect(url);
    });
  }

  /**
   * Image specific route.
   */
  router.get(/\/media\/(.*)/, function (req, res) {
    return tempRedirect(req, res);
  });

  /**
   * Other file type(s) route.
   */
  router.get(/\/uploads\/(.*)/, function (req, res) {
    return tempRedirect(req, res);
  });

  /**
   * Returns an object with `signedUrl` and `publicUrl` properties that
   * give temporary access to PUT an object in an S3 bucket.
   */
  router.get('/sign', function (req, res) {
    var filename = (0, _uuid2.default)() + '_' + req.query.objectName;
    debug('/sign filename: ', filename);
    var mimeType = req.query.contentType;
    debug('/sign mime: ', mimeType);
    var fileKey = '' + filename;
    debug('/sign key: ', fileKey);
    if (options.headers) {
      res.set(options.headers);
    }
    var s3Params = {
      Bucket: S3_BUCKET,
      Key: fileKey,
      Expires: 60,
      ContentType: mimeType,
      ACL: 'public-read'
    };

    _s2.default.getSignedUrl('putObject', s3Params, function (err, data) {
      if (err) {
        debug(err);
        return res.status(500).json('Cannot create S3 signed URL');
      }
      var signedFile = {
        file_name: filename,
        original_name: req.query.objectName,
        file_type: mimeType,
        s3_key: fileKey,
        signedUrl: data,
        publicUrl: '/s3/uploads/' + filename,
        filename: filename
      };
      res.status(201).json(signedFile);
    });
  });

  return router;
}