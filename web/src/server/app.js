/* @flow */
/* eslint-disable babel/new-cap, id-match */
import 'isomorphic-fetch/fetch-npm-node';
import http from 'http';
import { resolve as pathResolve } from 'path';
import express from 'express';
import _debug from 'debug';
import httpProxy from 'http-proxy';
import appRoot from 'boldr-utils/lib/node/appRoot';
import logger from 'boldr-utils/lib/logger';
import { enableEnhancedStackTraces } from './utils/debugUtil';
import { expressMiddleware, errorHandler } from './middleware';
import ssrMiddleware from './ssr';

const debug = _debug('boldr:server:app');

if (process.env.NODE_ENV === 'development') {
  enableEnhancedStackTraces(true);
}

const app: express$Application = express();

const server = http.createServer(app);

const port = parseInt(process.env.BOLDR_SERVER_PORT, 10);

const targetUrl = 'http://localhost:8080';
const proxy = httpProxy.createProxyServer({
  target: targetUrl,
  ws: true,
});

// Base Express middleware - body-parser, method-override, cors
expressMiddleware(app);

// Proxy to API server
app.use('/api/v1', (req, res) => {
  proxy.web(req, res, { target: `${targetUrl}/api/v1` });
});

app.use('/ws', (req, res) => {
  proxy.web(req, res, { target: `${targetUrl}/ws` });
});

server.on('upgrade', (req, socket, head) => {
  proxy.ws(req, socket, head);
});

proxy.on('error', (error, req, res) => {
  let json;
  if (error.code !== 'ECONNRESET') {
    console.error('proxy error', error);
  }
  if (!res.headersSent) {
    res.writeHead(500, { 'content-type': 'application/json' });
  }

  json = { error: 'proxy_error', reason: error.message };
  res.end(JSON.stringify(json));
});

// Configure static serving of our "public" root http path static files.
// Note: these will be served off the root (i.e. '/') of our application.
app.use('/uploads', express.static(pathResolve(appRoot.get(), './public/uploads')));
// Setup the public directory so that we can serve static assets.
app.use(express.static(pathResolve(appRoot.get(), './public')));
app.use(express.static(pathResolve(appRoot.get(), './dist/assets')));
// app.get('/admin', adminSsr);
// Pass any get request through the SSR middleware before sending it back
app.get('*', ssrMiddleware);
// Catch and format errors
errorHandler(app);

export default app;

server.listen(port);

server.on('listening', () => {
  const address = server.address();
  logger.info('Boldr running on port %s', address.port);
});
server.on('error', err => {
  logger.error(err);
  throw err;
});

process.on('SIGINT', () => {
  logger.info('shutting down!');
  server.close();
  process.exit();
});

process.on('uncaughtException', error => {
  logger.error(`uncaughtException: ${error.message}`);
  debug(error.stack);
  process.exit(1);
});
