require('dotenv').config({ silent: true });

const env = process.env.NODE_ENV || 'development';

if (env === 'development' || env === 'test') {
  require('babel-register')();
}

exports = module.exports = require('./engine');
