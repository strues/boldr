import { resolve as pathResolve } from 'path';
import http from 'http';
import httpProxy from 'http-proxy';
import express from 'express';
import appRootDir from 'app-root-dir';
import {
  boldrSSR,
  clientBundle,
  expressMiddleware,
  errorHandler,
  offlinePage,
  serviceWorker,
} from './middleware';

// const proxyTarget = `http://${config.apiHost}:${config.apiPort}/api/v1`;
const proxyTarget = 'http://0.0.0.0:2121/api/v1';
const proxy = httpProxy.createProxyServer({
  target: proxyTarget,
  ws: true,
});

// const cache = require('express-redis-cache')({ client: redisClient });
const debug = require('debug')('boldr:server-app');


const app = express();

// contains body-parser, method-override, etc...
expressMiddleware(app);
app.use((req, res, next) => {
  res.setHeader('Service-Worker-Allowed', '*');
  res.setHeader('X-Forwarded-For', req.ip);
  return next();
});

// Proxy to API server
app.use('/api/v1', (req, res) => {
  proxy.web(req, res, { target: proxyTarget });
});

proxy.on('error', (error, req, res) => {
  if (error.code !== 'ECONNRESET') {
    console.error('proxy error', error);
  }
  if (!res.headersSent) {
    res.writeHead(500, { 'content-type': 'application/json' });
  }

  const json = { error: 'proxy_error',
    reason: error.message };
  res.end(JSON.stringify(json));
});
if (!process.env.BUILD_FLAG_IS_DEV) {
  app.get(`/sw.js`, serviceWorker);
  app.get('/assets/offline.html', offlinePage);
}

app.use('/assets/', clientBundle);
// Configure static serving of our "public" root http path static files.
// Note: these will be served off the root (i.e. '/') of our application.
app.use(express.static(pathResolve(appRootDir.get(), './public')));

app.get('*', boldrSSR);

errorHandler(app);

export default app;
