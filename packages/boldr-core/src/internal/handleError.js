/* eslint-disable func-names */
import chalk from 'chalk';
import logger from 'boldr-utils/lib/logger';

export default function handleError(task) {
  return async function(args, options) {
    try {
      await task(args, options);
    } catch (error) {
      logger.error(`💩  ${error.message}`);
    }
  };
}
