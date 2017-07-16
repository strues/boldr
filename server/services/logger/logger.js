import winston from 'winston';
import { format } from 'date-fns';
import { config } from '../../config';
import WinstonToDebugLogger from './winstonToDebugLogger';

const isProd = process.env.NODE_ENV === 'production';
const LOG_LEVEL = process.env.LOG_LEVEL || 'debug';

winston.emitErrs = true;

const logTransports = [
  new WinstonToDebugLogger({
    level: config.get('isDebug') ? 'silly' : 'error',
  }),
  new winston.transports.Console({
    level: LOG_LEVEL,
    handleExceptions: true,
    json: isProd,
    timestamp: () => format(Date.now(), 'YYYY-MM-DD THH:mm:ss'),
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
