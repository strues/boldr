/* eslint-disable no-console, no-shadow */
import http from 'http';
import _debug from 'debug';

import app from './app';
import { initializeDb, disconnect } from './services/db';
import logger from './services/logger';
import { destroyRedis } from './services/redis';
import { SERVER_PORT } from './utils/port';

const debug = _debug('boldr:server');
// Launch Node.js server
const server = http.createServer(app);

initializeDb();

server.listen(SERVER_PORT);
server.on('listening', () => {
  const address = server.address();
  logger.info('Boldr running on port %s', address.port);
});
server.on('error', err => {
  logger.error(`⚠️  ${err}`);
  throw err;
});

process.on('SIGINT', () => {
  logger.info('shutting down!');
  disconnect();
  destroyRedis();
  server.close();
  process.exit(0);
});

process.on('uncaughtException', error => {
  logger.error(`uncaughtException: ${error.message}`);
  logger.error(error.stack);
  debug(error.stack);
  process.exit(1);
});

export default server;
