import http from 'http';
import Bootstrap from './core/bootstrap';

import logger from './core/logger';
import app from './app';

const Promise = require('bluebird');
const debug = require('debug')('boldr:engine');
const config = require('./config/config');

const env = config.get('node_env');
const port = normalizePort(config.get('port'));
const appName = `${config.get('app')} @ ${env} v${config.get('version')}`;

Promise.longStackTraces();

app.set('port', port);

const server = http.createServer(app);

async function startEngine() {
  await Bootstrap.init();
  server.listen(port);
  logger.info(`🌎  ==> Starting ${appName} on ${port}`);
}

process.on('SIGTERM', () => close(server));
process.on('SIGINT', () => close(server));
server.on('listening', onListening);
server.on('error', onError);

setImmediate(startEngine);

export default server;

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
