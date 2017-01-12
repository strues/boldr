/* eslint-disable no-unused-vars */
const path = require('path');
const _ = require('lodash');

const pjson = require('../package.json');
require('dotenv').load({ silent: true });

const config = {
  all: {
    env: process.env.NODE_ENV || 'development',
    port: process.env.API_PORT || 2121,
    host: process.env.API_HOST || 'localhost',
    ip: process.env.IP || '0.0.0.0',
    app: pjson.name,
    version: pjson.version,
    prefix: '/api/v1',
    dateFormat: 'yyyy-MM-dd',
    timeZone: '-07:00',
    postgres: {
      uri: process.env.POSTGRES_CONN_URI,
      pool: {
        min: 2,
        max: 10,
      },
    },
    redis: {
      uri: process.env.REDIS_CONN_URI,
    },
    privateKey: null,
    publicKey: null,
    saltRounds: 10,
    token: {
      secret: process.env.TOKEN_SECRET,
      expiration: 60 * 60 * 24, // 1 day
    },
    mail: {
      host: process.env.MAIL_HOST,
      user: process.env.MAIL_USER,
      password: process.env.MAIL_PASSWORD,
      port: 465,
      ssl: true,
      domain: 'boldr.io',
      from: 'boldr@boldr.io',
    },
    aws: {
      keyId: process.env.AWS_KEY_ID,
      keySecret: process.env.AWS_KEY_SECRET,
      bucket: 'boldrcms',
      region: 'us-west-1',
    },
    logger: {
      console: true,
      file: false,
    },
    body: {
      limit: '20mb',
    },
  },
};

module.exports = _.merge(config.all, config[config.all.env]);
// export default module.exports;
