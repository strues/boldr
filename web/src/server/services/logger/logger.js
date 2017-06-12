/* eslint-disable no-confusing-arrow */
import path from 'path';
import winston from 'winston';

const isProd = process.env.NODE_ENV === 'production';
const isDev = process.env.NODE_ENV === 'development';
const mode = isDev ? 'dev' : 'prod';

winston.emitErrs = true;

const logTransports = [
  new winston.transports.Console({
    level: 'debug',
    handleExceptions: true,
    json: isProd,
    prettyPrint: !isProd,
    colorize: !isProd,
  }),
];

const logger = new winston.Logger({
  transports: logTransports,
  exitOnError: false,
});
logger.stream = {
  write: message => {
    logger.info(message);
  },
};

export default logger;
