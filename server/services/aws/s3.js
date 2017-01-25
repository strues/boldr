import AWS from 'aws-sdk';
import getConfig from '../../../config/get';

const opts = {
  accessKeyId: getConfig('aws.keyId'),
  secretAccessKey: getConfig('aws.keySecret'),
  region: getConfig('aws.region'),
};

// all we do here is instantiate an S3 singleton that
// can be reused across the application.
const s3 = new AWS.S3(opts);

export default s3;
