import winston from 'winston';
import format from 'date-fns/format';
import { config } from '@boldr/config';

const isProd = process.env.NODE_ENV === 'production';

winston.emitErrs = true;
const LOG_LEVEL = config.get('logging.level') || 'info';

const logTransports = [
  new winston.transports.Console({
    level: LOG_LEVEL,
    handleExceptions: true,
    json: isProd,
    timestamp: () => format(Date.now(), 'YYYY-MM-DDTHH:mm:ss:Z'),
    prettyPrint: !isProd,
    colorize: !isProd,
  }),
];

const logger = new winston.Logger({
  transports: logTransports,
  levels: {
    critical: 0,
    error: 1,
    warning: 2,
    info: 3,
    debug: 4,
  },
  exitOnError: false,
});

winston.addColors({
  critical: 'red',
  error: 'red',
  warning: 'yellow',
  info: 'blue',
  debug: 'magenta',
});

logger.stream = {
  write: message => {
    logger.info(message);
  },
};

export default logger;
