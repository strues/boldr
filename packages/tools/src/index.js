import dotenv from 'dotenv';

// Initialize environment configuration
dotenv.config();

export { cleanClient, cleanServer, buildClient, buildServer } from './services/build';
export { startDevServer } from './services/startDevServer';

export { default as startRenderServer } from './services/startRenderServer';
