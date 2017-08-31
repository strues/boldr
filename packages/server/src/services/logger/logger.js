import winston from 'winston';
import format from 'date-fns/format';
import getConfig from '@boldr/config';

const config = getConfig();

const isProd = process.env.NODE_ENV === 'production';

winston.emitErrs = true;

const logTransports = [
  new winston.transports.Console({
    level: config.server.logging.level,
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
