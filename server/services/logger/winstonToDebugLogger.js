import debug from 'debug';
import winston from 'winston';

export default class WinstonToDebugLogger extends winston.Transport {
  constructor(options) {
    super(options);
    this.name = options.name || 'BoldrDebugWinstonLogger';
    this.level = options.level || 'info';
    this.prefix = options.prefix || 'boldr';
  }

  log(level, msg, meta, cb) {
    debug(`${this.prefix}:${level}`)(msg);
    cb(null, true);
  }
}
