import http from 'http';
import { resolve as pathResolve } from 'path';
import { Model } from 'objection';

import getConfig from '../config/get';
import db from './services/postgres';
import logger from './services/logger';


import app from './app';

global.Promise = require('bluebird');

const debug = require('debug')('boldr:engine');

const port = normalizePort(getConfig('port'));

require('dotenv').load({ silent: true });

app.set('port', port);
app.set('json spaces', 2);
const server = http.createServer(app);
Model.knex(db);

process.on('SIGTERM', () => close(listener));
process.on('SIGINT', () => close(listener));
server.on('listening', onListening);
server.on('error', onError);

// Create an http listener for our express app.
const listener = server.listen(getConfig('port'), getConfig('host'), () =>
  console.log(`Server listening on port ${getConfig('port')}`),
);

export default listener;

  /* istanbul ignore else */
function close(server) {
  return new Promise((resolve) => {
    server.close(() => {
      const msg = 'BoldrAPI shutting down...';
      logger.info(msg);
      resolve(msg);
      if (server) {
        server.close(process.exit.bind(process));
      } else {
        process.exit();
      }
    });
  });
}
  /* istanbul ignore next */
function onError(error) {
  if (error.syscall !== 'listen') {
    throw error;
  }

  const bind = (
    typeof port === 'string'
      ? `Pipe ${port}`
      : `Port ${port}`
  );

  // handle specific listen errors with friendly messages
  switch (error.code) {
    case 'EACCES':
      debug(`${bind} requires elevated privileges`);
      process.exit(1);
      break;
    case 'EADDRINUSE':
      debug(`${bind} is already in use`);
      process.exit(1);
      break;
    default:
      throw error;
  }
}
/* istanbul ignore next */
function onListening() {
  const addr = server.address();
  const bind = (
    typeof addr === 'string'
      ? `pipe ${addr}`
      : `port ${addr.port}`
  );
  debug(`Listening on ${bind}`);
}

/**
 * Normalize a port into a number, string, or false.
 * @param {Number|String} val
 */
 /* istanbul ignore next */
function normalizePort(val) {
  const port = parseInt(val, 10);

  if (isNaN(port)) {
    // named pipe
    return val;
  }

  if (port >= 0) {
    // port number
    return port;
  }

  return false;
}
