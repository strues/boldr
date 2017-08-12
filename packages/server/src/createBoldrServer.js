import path from 'path';
import appRoot from '@boldr/utils/lib/node/appRoot';
import express from 'express';
import { initializeDb, disconnect } from './services/db';
import logger from './services/logger';
import { destroyRedis } from './services/redis';
import routes from './routes';

import {
  initAuth,
  initGraphql,
  initSecurity,
  initCore,
  initErrorHandler,
  addFallbackHandler,
} from './middleware';

const defaultStatic = {
  public: '/static/',
  path: 'build/client',
};

export default function createBoldrServer({
  staticConfig = defaultStatic,
  afterSecurity = [],
  beforeFallback = [],
  enableCSP = false,
  enableNonce = true,
}) {
  // Create our express based server.
  const app = express();

  initializeDb()
    .then(() => logger.info('Database connected successfully'))
    .catch(err => logger.error(err));

  initErrorHandler(app);
  initSecurity(app, { enableCSP, enableNonce });

  // Allow for some early additions for middleware
  if (afterSecurity.length > 0) {
    afterSecurity.forEach(middleware => {
      if (middleware instanceof Array) {
        app.use(...middleware);
      } else {
        app.use(middleware);
      }
    });
  }

  initCore(app);
  // Session middleware, authentication check, rbac
  initAuth(app);

  // @todo: left as standard REST routes
  // /auth/check, /auth/verify, /token/reset-password, /token/forgot-password
  routes(app);
  // graphql middleware
  initGraphql(app);
  // Configure static serving of our webpack bundled client files.
  if (staticConfig) {
    app.use(staticConfig.public, express.static(staticConfig.path));
  }
  // Configure static serving of our "public" root http path static files.
  // Note: these will be served off the root (i.e. '/') of our application.
  app.use('/uploads', express.static(path.resolve(appRoot.get(), './public/uploads')));

  // Allow for some late additions for middleware
  if (beforeFallback.length > 0) {
    beforeFallback.forEach(middleware => {
      if (middleware instanceof Array) {
        app.use(...middleware);
      } else {
        app.use(middleware);
      }
    });
  }

  // For all things which did not went well.
  addFallbackHandler(app);

  process.on('SIGINT', () => {
    logger.info('shutting down!');
    disconnect();
    destroyRedis();
    app.close();
    process.exit();
  });

  process.on('uncaughtException', error => {
    logger.error(`uncaughtException: ${error.message}`);
    logger.error(error.stack);
    process.exit(1);
  });

  return app;
}
