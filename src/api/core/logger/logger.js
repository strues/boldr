/**
 * src/api/core/logger/logger.js
 * Starts a winston logging session
 *
 * @exports {EventHandler} - Winston event handler
 */
import path from 'path';
import fs from 'fs';
import winston from 'winston';
import conf from '../../config/config';

const logDir = path.resolve(`${process.cwd()}/logs`);
const tsFormat = () => (new Date()).toLocaleTimeString();

// Only create the folder in production.
if (process.env.NODE_ENV === 'production') {
  // Create the log directory if it doesnt already exist.
  if (!fs.existsSync(logDir)) {
    fs.mkdirSync(logDir);
  }
}

const transports = [];
if (conf.get('logger.console')) {
  transports.push(
    new winston.transports.Console({
      handleExceptions: false,
      prettyPrint: true,
      json: false,
      colorize: true,
      level: 'debug',
      timestamp: () => new Date().toLocaleString()
    })
  );
}
if (conf.get('logger.files')) {
  transports.push(
    new (require('winston-daily-rotate-file'))({
      filename: `${logDir}/apiError.log`,
      timestamp: tsFormat,
      datePattern: conf.get('dateFormat'),
      prepend: true,
      level: 'error'
    })
  );
}

const logger = new winston.Logger({ transports });
logger.exitOnError = false;
logger.stream = {
  write(message) {
    logger.info(message);
  }
};
process.on('unhandledRejection', (reason, promise) => {
  logger.warn(`Unhandled rejection at ${promise}\n`, reason);
});
export { logger };
export default logger;
