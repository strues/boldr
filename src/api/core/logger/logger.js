/**
 * src/core/logger/logger.js
 * Starts a winston logging session
 *
 * @exports {EventHandler} - Winston event handler
 */
import path from 'path';
import fs from 'fs';
import winston from 'winston';

const appRoot = require('app-root-dir');
const config = require('config/index');

const appRootDir = appRoot.get();
const logDir = path.resolve(`${appRootDir}/logs`);
const tsFormat = () => (new Date()).toLocaleTimeString();

// Only create the folder in production.
if (process.env.NODE_ENV === 'production') {
  // Create the log directory if it doesnt already exist.
  if (!fs.existsSync(logDir)) {
    fs.mkdirSync(logDir);
  }
}

const transports = [];
winston.emitErrs = true;

if (config.logger.console) {
  transports.push(
    new winston.transports.Console({
      handleExceptions: true,
      prettyPrint: true,
      json: false,
      colorize: true,
      level: 'debug',
      timestamp: tsFormat,
    }),
  );
}
if (config.logger.file) {
  transports.push(
    new (require('winston-daily-rotate-file'))({
      filename: `${logDir}/apiError.log`,
      timestamp: tsFormat,
      datePattern: config.dateFormat,
      prepend: true,
      level: 'error',
    }),
  );
}

const logger = new winston.Logger({ transports });
logger.exitOnError = false;
logger.stream = {
  write(message) {
    logger.info(message);
  },
};
process.on('unhandledRejection', (reason, Promise) => {
  logger.warn(`Unhandled rejection at ${Promise}\n`, reason);
});
export { logger };
export default logger;
