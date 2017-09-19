import express from 'express';

import initSecurity from './middleware/initSecurity';
import initCore from './middleware/initCore';
import initErrorHandler from './middleware/initErrorHandler';

const defaultStatic = {
  public: '/static/',
  path: 'build/client',
};

export default function createBackend({
  staticConfig = defaultStatic,
  afterSecurity = [],
  beforeFallback = [],
}) {
  // Create app instance of express
  const app = express();

  initSecurity(app);

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
  // Configure static serving of our webpack bundled client files.
  if (staticConfig) {
    app.use(staticConfig.public, express.static(staticConfig.path));
  }

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

  // if we end up here, something isnt right...
  initErrorHandler(app);

  return app;
}
