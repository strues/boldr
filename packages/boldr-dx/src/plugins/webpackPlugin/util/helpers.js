import path from 'path';

export const envDev = process.env.NODE_ENV === 'development';
export const envProd = process.env.NODE_ENV === 'production';
export const envDebug = process.env.BOLDR_DEBUG === 'true';
export const envVerbose = process.env.BOLDR_VERBOSE === 'true';
export const envAnalyze = process.env.BOLDR_ANALYZE === 'true';

export const postCssConfig = require(path.resolve(__dirname, 'postcss.config.js'));
