require('babel-runtime/core-js/promise').default = require('bluebird');
require('dotenv').load({ silent: true });

require('./server');
