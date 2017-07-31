import dotenv from 'dotenv';
import { devMiddleware } from './server/devMiddleware';

import { cleanClient, cleanServer, buildClient, buildServer } from './commands/build';
import { startDevServer } from './commands/dev';
import { startRenderServer } from './commands/ssr';

// Initialize environment configuration
dotenv.config();

export {
  devMiddleware,
  cleanClient,
  cleanServer,
  startRenderServer,
  buildClient,
  buildServer,
  startDevServer,
};
