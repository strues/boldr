import uuid from 'uuid';
import express from 'express';
import s3 from '../../services/aws/s3';
import config from '../../../../config/api';

const debug = require('debug')('boldrAPI:s3');

function checkTrailingSlash(path) {
  if (path && path[path.length - 1] !== '/') {
    path += '/';
  }
  return path;
}

export default function S3Router(options) {
  const S3_BUCKET = config.aws.bucket;
  const getFileKeyDir = options.getFileKeyDir || function() {
    return '';
  };

  if (!S3_BUCKET) {
    throw new Error('S3_BUCKET is required.');
  }

  const s3Options = {};
  if (options.region) {
    s3Options.region = options.region;
  }
  if (options.signatureVersion) {
    s3Options.signatureVersion = options.signatureVersion;
  }

  const router = express.Router();

   /**
    * Redirects image requests with a temporary signed URL, giving access
    * to GET an upload.
    */
  function tempRedirect(req, res, next) {
    s3.getSignedUrl('getObject', {
      Bucket: S3_BUCKET,
      Key: checkTrailingSlash(getFileKeyDir(req)) + req.params[0],
    }, (err, url) => {
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
  router.get(/\/media\/(.*)/, (req, res) => {
    return tempRedirect(req, res);
  });

   /**
    * Other file type(s) route.
    */
  router.get(/\/uploads\/(.*)/, (req, res) => {
    return tempRedirect(req, res);
  });

   /**
    * Returns an object with `signedUrl` and `publicUrl` properties that
    * give temporary access to PUT an object in an S3 bucket.
    */
  router.get('/sign', (req, res) => {
    const filename = `${uuid()}_${req.query.objectName}`;
    debug('/sign filename: ', filename);
    const mimeType = req.query.contentType;
    debug('/sign mime: ', mimeType);
    const fileKey = `${filename}`;
    debug('/sign key: ', fileKey);
    if (options.headers) {
      res.set(options.headers);
    }
    const s3Params = {
      Bucket: S3_BUCKET,
      Key: fileKey,
      Expires: 60,
      ContentType: mimeType,
      ACL: 'public-read',
    };

    s3.getSignedUrl('putObject', s3Params, (err, data) => {
      if (err) {
        debug(err);
        return res.status(500).json('Cannot create S3 signed URL');
      }
      const signedFile = {
        file_name: filename,
        original_name: req.query.objectName,
        file_type: mimeType,
        s3_key: fileKey,
        signedUrl: data,
        publicUrl: `/s3/uploads/${filename}`,
        filename,
      };
      res.status(201).json(signedFile);
    });
  });

  return router;
}
