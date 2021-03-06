/* eslint-disable no-console, no-shadow */
import http from 'http';
import Bluebird from 'bluebird';
import config from '@boldr/config';

import app from './app';
import { dbConnect, dbDisconnect } from './services/db';
import logger from './services/logger';
import normalizePort from './utils/normalizePort';

global.Promise = Bluebird;
Promise.config({
  // Enable warnings
  warnings: false,
  // Enable long stack traces
  longStackTraces: true,
  // Enable cancellation
  cancellation: true,
  // Enable monitoring
  monitoring: true,
});

const port = normalizePort(config.get('server.port'));
// Launch Node.js server
const server = http.createServer(app);

server.listen(port);
dbConnect();
server.on('listening', () => {
  const address = server.address();
  logger.info('Boldr running on port %s', address.port);
});
server.on('error', err => {
  logger.error(`⚠️  ${err}`);
  throw err;
});

function gracefulExit(options, err) {
  if (options.cleanup) {
    const actions = [server.close, dbDisconnect];
    actions.forEach((close, i) => {
      try {
        close(() => {
          if (i === actions.length - 1) {
            process.exit();
          }
        });
        // eslint-disable-next-line
      } catch (err) {
        if (i === actions.length - 1) {
          process.exit();
        }
      }
    });
  }
  if (err) {
    logger.error(err.stack);
  }
  if (options.exit) {
    process.exit();
  }
}

process.on('exit', gracefulExit.bind(null, { cleanup: true }));
process.on('SIGINT', gracefulExit.bind(null, { exit: true }));
process.on('SIGTERM', gracefulExit.bind(null, { exit: true }));
process.on('uncaughtException', gracefulExit.bind(null, { exit: true }));

export default server;
