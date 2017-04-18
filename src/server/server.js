import http from 'http';
import {resolve as pathResolve} from 'path';
import app from './app';

const debug = require('debug')('boldr:engine');

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
  console.error(`uncaughtException: ${error.message}`);
  console.error(error.stack);
  process.exit(1);
});

export default server;
