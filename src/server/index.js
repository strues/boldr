/* @flow */

import { resolve as pathResolve } from 'path';
import express from 'express';
import type { $Request, $Response, NextFunction } from 'express';
import appRootDir from 'app-root-dir';
import compression from 'compression';
import cookieParser from 'cookie-parser';
import httpProxy from 'http-proxy';
// configuration
import boldrConfig from '../../config/private/boldr';
import envConfig from '../../config/private/environment';
// middleware
import security from './middleware/security';
import serviceWorker from './middleware/serviceWorker';
import clientBundle from './middleware/clientBundle';
import errorHandlers from './middleware/errorHandlers';
import boldrSSR from './middleware/boldrSSR';

// these values are to inform the proxy, which is running here, where our backend
// api is located.
const proxyTo = `http://${envConfig.apiHost}:${envConfig.apiPort}/api/v1`;
// Create Express server.
const app = express();
app.use(compression());
app.use(cookieParser());

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

// Configure static serving of our webpack bundled client files.
// Configure serving of our client bundle.
app.use(boldrConfig.bundles.client.webPath, clientBundle);
// Configure sstatic serving of our "public" root http path static files.
app.use(express.static(pathResolve(appRootDir.get(), boldrConfig.publicAssetsPath)));

// When in production mode, we will serve our service worker which was generated
// by the offline-plugin webpack plugin. See the webpack plugins section for
// more information.
// Note: the service worker needs to be served from the http root of your
// application for it to work correctly.
if (process.env.NODE_ENV === 'production') {
  app.get(`/${boldrConfig.serviceWorker.fileName}`, serviceWorker);
}

app.get('*', boldrSSR);

app.use(...errorHandlers);
// Create an http listener for our express app.
const port = parseInt(envConfig.port, 10);
const listener = app.listen(port, () =>
  console.log(`Server listening on port ${port}`),
);

// We export the listener as it will be handy for our development hot reloader.
export default listener;
