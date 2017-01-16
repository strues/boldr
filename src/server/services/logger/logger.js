/**
 * src/core/logger/logger.js
 * Starts a winston logging session
 *
 * @exports {EventHandler} - Winston event handler
 */
import path from 'path';
import fs from 'fs';
import winston from 'winston';
import config from '../../../../config';

const tsFormat = () => (new Date()).toLocaleTimeString();

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
