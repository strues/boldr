import http from 'http';
import Promise from 'bluebird';
import { enableEnhancedStackTraces } from './core/debugUtil';
import { logger } from './services';
import app from './app';

global.Promise = Promise;
Promise.config({
  warnings: true,
  longStackTraces: true,
  cancellation: true,
  monitoring: true,
});

if (process.env.NODE_ENV === 'development') {
  enableEnhancedStackTraces();
}

const server = http.createServer(app);

const port = parseInt(process.env.BOLDR_SERVER_PORT, 10);

server.on('listening', () => {
  const address = server.address();
  logger.info('Boldr running on port %s', address.port);
});
server.on('error', err => {
  logger.error(`⚠️  ${err}`);
  throw err;
});
server.listen(port);

process.on('SIGINT', () => {
  logger.info('shutting down!');
  server.close();
  process.exit();
});

process.on('uncaughtException', error => {
  logger.error(`uncaughtException: ${error.message}`);
  logger.error(error.stack);
  debug(error.stack);
  process.exit(1);
});

export default server;
