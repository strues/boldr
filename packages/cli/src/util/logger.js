import util from 'util';
import winston from 'winston';
import chalk from 'chalk';

const version = require('../../package.json').version;

const CaporalTransport = function(options) {
  this.name = 'caporal';
  this.level = options.level || 'info';
};

util.inherits(CaporalTransport, winston.Transport);

CaporalTransport.prototype.log = function(level, msg, meta, callback) {
  msg = msg + '\n';
  const levelInt = winston.levels[level];
  const stdio = levelInt <= 1 ? 'stderr' : 'stdout';
  process[stdio].write(msg);
  callback(null, true, stdio);
};

exports.createLogger = function createLogger(opts) {
  opts = opts || {};

  const logger = (exports.logger = new winston.Logger({
    transports: [new CaporalTransport(opts)],
  }));

  return logger;
};

exports.printHeader = function(logger) {
  logger.info('\n' + chalk.blue('⊧Boldr CLI') + ' ' + chalk.gray(version));
};
