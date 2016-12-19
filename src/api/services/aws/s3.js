import AWS from 'aws-sdk';
import config from 'config/index';

const opts = {
  accessKeyId: config.aws.keyId,
  secretAccessKey: config.aws.keySecret,
  region: config.aws.region,
};

// all we do here is instantiate an S3 singleton that
// can be reused across the application.
const s3 = new AWS.S3(opts);

export default s3;
