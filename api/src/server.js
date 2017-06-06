/* @flow */
/* eslint-disable no-console, no-shadow */
import http from 'http';
import app from './app';
import { db, initializeDb, disconnect } from './services/db';
import logger from './services/logger';
import { destroyRedis } from './services/redis';

const port = process.env.API_PORT || 8080;
const host = process.env.API_HOST || '0.0.0.0';

// Launch Node.js server
initializeDb();

const server = app.listen(port, host, () => {
  console.log(`Boldr is listening on http://${host}:${port}/`);
});
function handleExit(options, err) {
  if (options.cleanup) {
    const actions = [server.close, disconnect, destroyRedis];
    actions.forEach((close, i) => {
      try {
        close(() => {
          if (i === actions.length - 1) {
            process.exit();
          }
        });
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

process.on('exit', handleExit.bind(null, { cleanup: true }));
process.on('SIGINT', handleExit.bind(null, { exit: true }));
process.on('SIGTERM', handleExit.bind(null, { exit: true }));
process.on('uncaughtException', handleExit.bind(null, { exit: true }));
