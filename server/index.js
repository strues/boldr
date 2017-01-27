
import http from 'http';
import { resolve as pathResolve } from 'path';
import getConfig from '../config/get';
import logger from './services/logger';

let db,
  app,
  redis,
  server;

let reload = Promise.resolve();

const debug = require('debug')('boldr:engine');

const port = normalizePort(getConfig('port'));

require('dotenv').load({ silent: true });

const launch = (callback) => {
  db = require('./services/postgres/postgres').default;
  app = require('./app').default;
  redis = require('./services/redis/redis').default;
  // Create an http listener for our express app.
  server = app.listen(getConfig('port'), getConfig('host'), () => {
    console.log(`Server listening on port ${getConfig('port')}`);
    if (callback) callback();
  });
};
const listener = server;

export default listener;

// Shutdown Node.js server and database clients
const shutDown = () => Promise.resolve()
  .then(() => server && new Promise(resolve => server.close(resolve)))
  .then(() => Promise.all([
    () => db && db.destroy(),
    () => redis && new Promise(resolve => redis.quit(resolve)),
  ]));

const handleError = err => console.error(err.stack);

// Graceful shutdown
process.once('SIGTERM', () => shutDown().then(() => process.exit()));

// In development mode the app is launched with an IPC channel
if (process.channel) {
  // Prevent exiting the process in development mode
  process.on('uncaughtException', handleError);
  // Restart the server on code changes (see scripts/run.js)
  process.on('message', (message) => {
    if (message === 'reload') {
      reload = reload.then(() => shutDown()).then(() => {
        Object.keys(require.cache).forEach((key) => {
          if (key.indexOf('node_modules') === -1) delete require.cache[key];
        });
        return new Promise(resolve => launch(resolve)).catch(handleError);
      });
    }
  });
  process.on('disconnect', () => process.emit('SIGTERM'));
}

launch();

/**
 * Normalize a port into a number, string, or false.
 * @param {Number|String} val
 */
function normalizePort(val) {
  const port = parseInt(val, 10);
  if (isNaN(port)) return val;
  if (port >= 0) return port;
  return false;
}
