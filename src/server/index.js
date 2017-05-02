import http from 'http';
import https from 'https';
import app from './app';

const debug = require('debug')('boldr:server');

https.globalAgent.maxSockets = 1000;
http.globalAgent.maxSockets = 1000;

const port = 3000;
const server = http.createServer(app);
// Create an http listener for our express app.
server.listen(port, () => console.log(`Server listening on port ${port}`));

process.on('SIGINT', () => {
  console.info('shutting down!');
  server.close();
  process.exit();
});

process.on('uncaughtException', error => {
  debug(`uncaughtException: ${error.message}`);
  console.error(error.stack);
  process.exit(1);
});

export default server;
