import express from 'express';

// import initSecurity from './middleware/initSecurity';
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
  // Create our express based server.
  const server = express();

  // initSecurity(server, { enableCSP, enableNonce });

  // Allow for some early additions for middleware
  if (afterSecurity.length > 0) {
    afterSecurity.forEach(middleware => {
      if (middleware instanceof Array) {
        server.use(...middleware);
      } else {
        server.use(middleware);
      }
    });
  }

  initCore(server);

  // Configure static serving of our webpack bundled client files.
  if (staticConfig) {
    server.use(staticConfig.public, express.static(staticConfig.path));
  }

  // Allow for some late additions for middleware
  if (beforeFallback.length > 0) {
    beforeFallback.forEach(middleware => {
      if (middleware instanceof Array) {
        server.use(...middleware);
      } else {
        server.use(middleware);
      }
    });
  }

  // if we end up here, something isnt right...
  initErrorHandler(server);

  return server;
}
