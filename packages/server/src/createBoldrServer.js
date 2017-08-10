import express from 'express';

import addSecurityMiddleware from './middleware/addSecurityMiddleware';
import addCoreMiddleware from './middleware/addCoreMiddleware';
import addErrorMiddleware from './middleware/addErrorMiddleware';
import addFallbackHandler from './middleware/addFallbackHandler';

const defaultLocale = {
  default: 'en-US',
  supported: ['en-US'],
};

const defaultStatic = {
  public: '/static/',
  path: 'build/client',
};

export default function createBoldrServer({
  localeConfig = defaultLocale,
  staticConfig = defaultStatic,
  afterSecurity = [],
  beforeFallback = [],
  enableCSP = false,
  enableNonce = false,
}) {
  // Create our express based server.
  const server = express();

  addErrorMiddleware(server);
  addSecurityMiddleware(server, { enableCSP, enableNonce });

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

  addCoreMiddleware(server, { locale: localeConfig });

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

  // For all things which did not went well.
  addFallbackHandler(server);

  return server;
}
