/* eslint-disable no-confusing-arrow */
import path from 'path';
import winston from 'winston';

import config from '../../config';

const isProd = process.env.NODE_ENV === 'production';
const isDev = process.env.NODE_ENV === 'development';
const mode = isDev ? 'dev' : 'prod';
const logsFolder = config.logging.file.dir;
const logToFile = config.logging.file.enabled;
const loggingLevel = config.logging.file.level;
const fileName = config.logging.file.filename;

winston.emitErrs = true;

const logTransports = [
  new winston.transports.Console({
    level: config.logging.level,
    handleExceptions: true,
    json: isProd,
    prettyPrint: !isProd,
    colorize: !isProd,
  }),
];
// if (config.logging.file.enable && process.env.NODE_ENV !== 'test') {
//   logTransports.push(
//     new (require('winston-daily-rotate-file'))({
//       level: loggingLevel,
//       filename: `${logsFolder}/${fileName}-${mode}-${loggingLevel}.log`,
//       json: true,
//       prettyPrint: false,
//       maxsize: 5242880,
//       maxFiles: 5,
//     }),
//   );
// }

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
