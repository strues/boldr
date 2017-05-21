import 'isomorphic-fetch';
import http from 'http';
import { enableEnhancedStackTraces } from './core/debugUtil';
import { logger, initializeDb, disconnect, destroyRedis } from './services';
import app from './app';
import config from './config';

enableEnhancedStackTraces();

const server = http.createServer(app);

const port = parseInt(config.server.port, 10);
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
    return server.listen(port);
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

const listener = server;

export default listener;
