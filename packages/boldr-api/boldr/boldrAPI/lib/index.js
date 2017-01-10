'use strict';

require('dotenv').config({ silent: true });

var env = process.env.NODE_ENV || 'development';

if (env === 'development' || env === 'test') {
  require('babel-register')();
}

exports = module.exports = require('./engine');