import dotenv from 'dotenv';

// Initialize environment configuration
dotenv.config();

export { default as devMiddleware } from './server/devMiddleware';

export { cleanClient, cleanServer, buildClient, buildServer } from './services/build';
export { startDevServer } from './services/startDevServer';
export { default as buildWebpackDlls } from './services/buildWebpackDlls';
export { default as startRenderServer } from './services/startRenderServer';
