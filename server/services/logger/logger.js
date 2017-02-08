/**
 * server/services/logger/logger.js
 * Starts a winston logging session
 *
 * @exports {EventHandler} - Winston event handler
 */
import path from 'path';
import fs from 'fs';
import winston from 'winston';
import getConfig from '../../../config/get';

const tsFormat = () => (new Date()).toLocaleTimeString();

const transports = [];
winston.emitErrs = true;

if (getConfig('logger.console')) {
  transports.push(
    new winston.transports.Console({
      handleExceptions: true,
      level: 'silly',
      prettyPrint: true,
      colorize: true,
      silent: false,
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

export { logger };
export default logger;
