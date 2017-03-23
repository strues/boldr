/* eslint-disable no-confusing-arrow */
import winston from 'winston';
import config from '../../config';

const formatter = options =>
  options.meta && options.meta.requestId ? `[RQID=${options.meta.requestId}] ${options.message}` : `${options.message}`;

const logger = new winston.Logger({
  transports: [
    new winston.transports.Console({
      level: 'debug',
      formatter,
    }),
  ],
});

export default logger;
