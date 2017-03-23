import http from 'http';
import { Model } from 'objection';

import app from './app';
import { logger, db, disconnect } from './services';
import config from './config';

const debug = require('debug')('boldrAPI:engine');

const PORT = config.get('port');
const HOST = config.get('host');
const server = http.createServer(app);

Model.knex(db);

server.listen(PORT, HOST);

server.on('error', err => {
  logger.error(`⚠️  ${err}`);
  throw err;
});

server.on('listening', () => {
  const address = server.address();
  logger.info('🚀  Starting server on %s:%s', address.address, address.port);
});

process.on('SIGINT', () => {
  logger.info('shutting down!');
  disconnect();
  server.close();
  process.exit();
});

process.on('uncaughtException', error => {
  logger.error(`uncaughtException: ${error.message}`);
  logger.error(error.stack);
  debug(error.stack);
  process.exit(1);
});
