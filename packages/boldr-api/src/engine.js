import 'babel-polyfill';
import http from 'http';
import https from 'https';
import fs from 'fs';
import { resolve as pathResolve } from 'path';
import appRootDir from 'app-root-dir';
import config from '../config/api';

import bootstrap from './core/bootstrap';
import logger from './core/logger';
import app from './app';

const Promise = require('bluebird');
const debug = require('debug')('boldrAPI:engine');


const port = normalizePort(config.port);
const appName = `${config.app} @ v${config.version}`;

require('dotenv').load({ silent: true });

global.Promise = Promise;
Promise.longStackTraces();

const ssl = {
  key: fs.readFileSync(pathResolve(appRootDir.get(), './config/ssl.key')),
  cert: fs.readFileSync(pathResolve(appRootDir.get(), './config/ssl.crt')),
};

app.set('port', port);
app.set('json spaces', 2);
const server = http.createServer(app);
/* istanbul ignore next */
async function startEngine() {
  await bootstrap.init();
  server.listen(port);
  logger.info(`🌎  ==> Starting ${appName} on ${port}`);
}

process.on('SIGTERM', () => close(server));
process.on('SIGINT', () => close(server));
server.on('listening', onListening);
server.on('error', onError);

setImmediate(startEngine);

export default server;
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
