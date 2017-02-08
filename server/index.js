import http from 'http';
import { resolve as pathResolve } from 'path';
import { Model } from 'objection';

import getConfig from '../config/get';
import db from './services/postgres';
import logger from './services/logger';
import app from './app';

global.Promise = require('bluebird');

const debug = require('debug')('boldr:engine');

const port = getConfig('port');

require('dotenv').load({ silent: true });

const server = http.createServer(app);
Model.knex(db);

// Create an http listener for our express app.
const listener = server.listen(getConfig('port'), getConfig('host'), () =>
  console.log(`Server listening on port ${getConfig('port')}`),
);

process.on('SIGINT', () => {
  logger.info('shutting down!');
  db.close();
  server.close();
  process.exit();
});

process.on('uncaughtException', (error) => {
  logger.error(`uncaughtException: ${error.message}`);
  logger.error(error.stack);
  process.exit(1);
});

export default listener;
