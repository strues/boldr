import http from 'http';
import { resolve as pathResolve } from 'path';
import { Model } from 'objection';

import config from '../config';
import db, { disconnect } from './services/postgres';
import logger from './services/logger';
import app, { server } from './app';

const debug = require('debug')('boldr:engine');

const port = config('port');

Model.knex(db);

// Create an http listener for our express app.
const listener = server.listen(config('port'), config('host'), () =>
  console.log(`Server listening on port ${config('port')}`),
);

process.on('SIGINT', () => {
  logger.info('shutting down!');
  disconnect();
  server.close();
  process.exit();
});

process.on('uncaughtException', (error) => {
  logger.error(`uncaughtException: ${error.message}`);
  logger.error(error.stack);
  process.exit(1);
});

export { server };
export default listener;
