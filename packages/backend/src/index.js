import dotenv from 'dotenv';

// Initialize environment configuration
dotenv.config();

export { default as initCore } from './middleware/initCore';
export { default as initErrorHandler } from './middleware/initErrorHandler';
export { default as initSecurity } from './middleware/initSecurity';
export { default as queryLogger } from './middleware/queryLogger';
export { default as apolloUpload, processRequest } from './middleware/apolloUpload';
export { default as createBackend } from './createBackend';

export { default as mailer, transporter } from './services/mailer/mailer';
export { createClient, createClientFactory } from './services/redis';

export { default as normalizePort } from './utils/normalizePort';
export { wrapRouter } from './utils/asyncRouter';
