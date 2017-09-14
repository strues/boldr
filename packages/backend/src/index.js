import dotenv from 'dotenv';

// Initialize environment configuration
dotenv.load();

export { default as initCore } from './middleware/initCore';
export { default as initError } from './middleware/initError';
// export { default as initSecurity } from './middleware/initSecurity';
export { default as fallbackHandler } from './fallbackHandler';
export { default as createBackend } from './createBackend';
