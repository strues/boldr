import dotenv from 'dotenv';

// Initialize environment configuration
dotenv.config();

export { default as initCore } from './middleware/initCore';
export { default as initErrorHandler } from './middleware/initErrorHandler';
// export { default as initSecurity } from './middleware/initSecurity';
export { default as createBackend } from './createBackend';
