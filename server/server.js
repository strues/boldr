/* @flow */
/* eslint-disable no-console, no-shadow */
import http from 'http';
import app from './app';
import { db, initializeDb, disconnect } from './services/db';
import logger from './services/logger';
import { destroyRedis } from './services/redis';

const processPort = parseInt(process.env.BOLDR_PORT, 10);
const host = process.env.BOLDR_HOST || '0.0.0.0';
// Launch Node.js server
const port = processPort || 3000;
const server = http.createServer(app);
// // WebSocket server for subscriptions
// const websocketServer = createServer((request, response) => {
//   response.writeHead(404);
//   response.end();
// });
//
// websocketServer.listen(WS_PORT, () => console.log( // eslint-disable-line no-console
//   `Websocket Server is now running on http://localhost:${WS_PORT}`
// ));
//
// // eslint-disable-next-line
// new SubscriptionServer(
//   { subscriptionManager },
//   websocketServer
// );
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
