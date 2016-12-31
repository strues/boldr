/* @flow */
/* eslint-disable no-console */

// This grants us source map support, which combined with our webpack source
// maps will give us nice stack traces.
import 'source-map-support/register';

import { resolve as pathResolve } from 'path';
import express from 'express';
import type { $Request, $Response, Middleware, NextFunction } from 'express';
import compression from 'compression';
import appRootDir from 'app-root-dir';
import httpProxy from 'http-proxy';
import config from '../../config';
import boldrSSR from './middleware/boldrSSR';
import security from './middleware/security';
import clientBundle from './middleware/clientBundle';
import serviceWorker from './middleware/serviceWorker';
import errorHandlers from './middleware/errorHandlers';

// these values are to inform the proxy, which is running here, where our backend
// api is located.
const proxyTo = `http://${config.apiHost}:${config.apiPort}/api/v1`;

// Create our express based server.
const app = express();

const proxy = httpProxy.createProxyServer({
  target: proxyTo,
});

app.use((req: $Request, res: $Response, next: NextFunction) => {
  res.setHeader('Service-Worker-Allowed', '/');
  res.setHeader('X-Forwarded-For', req.ip);
  return next();
});
// Don't expose any software information to hackers.
app.disable('x-powered-by');

// Security middlewares.
app.use(...security);

// Gzip compress the responses.
app.use(compression());

// Proxying all requests matching this endpoint
app.use('/api/v1', (req: $Request, res: $Response) => {
  res.setHeader('Content-Type', 'application/json');
  proxy.web(req, res, { target: proxyTo });
});

proxy.on('error', (err: Object, req: $Request, res: $Response) => {
  if (err.code !== 'ECONNRESET') console.log('proxy error', err);
  if (!res.headersSent) res.writeHead(500, { 'Content-Type': 'application/json' });
  const json = { error: 'proxy_error', reason: err.message };
  res.end(JSON.stringify(json));
});

if (process.env.NODE_ENV === 'production') {
  app.get(`/${config.serviceWorker.fileName}`, serviceWorker);
}

// Configure serving of our client bundle.
app.use(config.bundles.client.webPath, clientBundle);

// Configure static serving of our "public" root http path static files.
// Note: these will be served off the root (i.e. '/') of our application.
app.use(express.static(pathResolve(appRootDir.get(), config.publicAssetsPath)));

// The React application middleware.
app.get('*', boldrSSR);

// Error Handler middlewares.
app.use(...errorHandlers);

// Create an http listener for our express app.
const listener = app.listen(config.port, config.host, () =>
  console.log(`Server listening on port ${config.port}`),
);

export default listener;
