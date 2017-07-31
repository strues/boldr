/* eslint-disable no-console, no-shadow */
import http from 'http';
import _debug from 'debug';
import app from './app';
import { db, initializeDb, disconnect } from './services/db';
import logger from './services/logger';
import { destroyRedis } from './services/redis';
import { SERVER_PORT } from './utils/port';

const debug = _debug('boldr:server');
const host = process.env.BOLDR_HOST || '0.0.0.0';
// Launch Node.js server
const server = http.createServer(app);

Promise = require('bluebird');
global.Promise = Promise;

initializeDb()
  .then(() => {
    logger.info('Database connected successfully');
    server.on('listening', () => {
      const address = server.address();
      logger.info('Boldr running on port %s', address.port);
    });
    server.on('error', err => {
      logger.error(`⚠️  ${err}`);
      throw err;
    });
    return server.listen(SERVER_PORT);
  })
  .catch(err => {
    logger.error(err);
    process.exit(1);
  });

process.on('SIGINT', () => {
  logger.info('shutting down!');
  disconnect();
  destroyRedis();
  server.close();
  process.exit();
});

process.on('uncaughtException', error => {
  logger.error(`uncaughtException: ${error.message}`);
  logger.error(error.stack);
  debug(error.stack);
  process.exit(1);
});
