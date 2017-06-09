/* @flow */
type formatter = () => { errors: string[], warnings: string[] };

import path from 'path';
import chalk from 'chalk';
import clearConsole from 'react-dev-utils/clearConsole';
import formatWebpackMessages from 'react-dev-utils/formatWebpackMessages';
import logger from 'boldr-utils/lib/logger';

let IS_COMPILING = false;
let IS_DONE = false;

class LoggerPlugin {
  constructor(options: Object) {
    options = options || {};
    (this: any).verbose = options.verbose;
    (this: any).onSuccessMessage = options.onSuccessMessage;
    (this: any).deprecationMessage = options.deprecationMessage;
    (this: any).target = options.target;
  }

  apply(compiler: Object) {
    compiler.plugin('done', stats => {
      const rawMessages = stats.toJson({}, true);
      const messages = formatWebpackMessages(rawMessages);
      IS_COMPILING = false;

      if (!messages.errors.length && !messages.warnings.length) {
        if (!IS_DONE) {
          if (!this.verbose) {
            clearConsole();
          }
          const time = stats.endTime - stats.startTime;
          logger.end(`Bundle for ${this.target} compiled successfully in ${time} ms`);
          IS_DONE = true;

          if (this.onSuccessMessage) {
            logger.end(this.onSuccessMessage);
          }

          if (this.deprecationMessage) {
            logger.warn(this.deprecationMessage);
          }
        }
      }

      if (messages.errors.length) {
        messages.errors.forEach(e => {
          logger.error(`Failed to compile ${this.target} with ${messages.errors.length} errors`);
          logger.error(e);
        });
        return;
      }

      if (messages.warnings.length) {
        logger.warn(`Failed to compile with ${messages.warnings.length} warnings`);
        messages.warnings.forEach(w => logger.info(w));
      }
    });

    compiler.plugin('compile', params => {
      IS_DONE = false;
      if (!IS_COMPILING) {
        if (!this.verbose) {
          clearConsole();
        }
        logger.info('Compiling...');
        IS_COMPILING = true;
      }
    });
  }
}

export default LoggerPlugin;
