/* eslint-disable no-console, no-shadow */
import http from 'http';
import _debug from 'debug';
import getConfig from '@boldr/config';
import app from './app';
import { initializeDb, disconnect } from './services/db';
import logger from './services/logger';
import { destroyRedis } from './services/redis';
import { SERVER_PORT } from './utils/port';
const config = getConfig();
console.log(config);
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

process.on('uncaughtException', error => {
  logger.error(`uncaughtException: ${error.message}`);
  logger.error(error.stack);
  debug(error.stack);
  process.exit(1);
});

process.on('unhandledRejection', (reason, promise) => {
  // eslint-disable-next-line no-console
  logger.error('unhandledRejection', 'reason', reason);
  // eslint-disable-next-line no-console
  logger.error('unhandledRejection', 'promise', promise);
});

const gracefulShutdown = () => {
  logger.info('Received kill signal, shutting down gracefully.');
  server.close(() => {
    disconnect();
    destroyRedis();

    logger.info('Closed out remaining connections.');
    process.exit();
  });

  // if after
  setTimeout(() => {
    logger.error('Could not close connections in time, forcefully shutting down');
    process.exit();
  }, 10 * 1000);
};

// listen for TERM signal .e.g. kill
process.on('SIGTERM', gracefulShutdown);

// listen for INT signal e.g. Ctrl-C
process.on('SIGINT', gracefulShutdown);
export default server;
