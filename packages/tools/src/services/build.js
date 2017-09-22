import webpack from 'webpack';
import { remove } from 'fs-extra';
import { promisify } from 'bluebird';
import logger from '@boldr/utils/lib/logger';
import config from '@boldr/config';
import formatWebpackMessages from 'react-dev-utils/formatWebpackMessages';

import createWebpackConfig from '../createWebpackConfig';

const removePromise = promisify(remove);

export function buildClient() {
  const clientConfig = createWebpackConfig({
    target: 'client',
    env: 'production',
  });

  return new Promise((resolve, reject) => {
    /* eslint-disable no-console */
    webpack(clientConfig, (fatalError, stats) => {
      if (fatalError) {
        const fatalMsg = `Fatal error during compiling client: ${fatalError}`;
        logger.error(fatalMsg);
        return reject(fatalMsg);
      }

      const rawMessages = stats.toJson({});
      const messages = formatWebpackMessages(rawMessages);

      const isSuccessful = !messages.errors.length && !messages.warnings.length;
      if (isSuccessful) {
        logger.end('Compiled client successfully!');
      }

      // If errors exist, only show errors.
      if (messages.errors.length) {
        logger.error('Failed to compile client!\n');
        logger.error(messages.errors.join('\n\n'));
        const err = new Error('Failed to compile client!');
        return reject(err);
      }

      return resolve(true);
    });
  });
}

export function buildServer() {
  const serverConfig = createWebpackConfig({
    target: 'server',
    env: 'production',
  });

  return new Promise((resolve, reject) => {
    /* eslint-disable no-console */
    webpack(serverConfig, (fatalError, stats) => {
      if (fatalError) {
        const fatalMsg = `Fatal error during compiling server: ${fatalError}`;
        logger.error(fatalMsg);
        return reject(fatalMsg);
      }

      const rawMessages = stats.toJson({});
      const messages = formatWebpackMessages(rawMessages);

      const isSuccessful = !messages.errors.length && !messages.warnings.length;
      if (isSuccessful) {
        logger.end('Compiled server successfully!');
      }

      // If errors exist, only show errors.
      if (messages.errors.length) {
        logger.error('Failed to compile server!\n');
        logger.error(messages.errors.join('\n\n'));
        const err = new Error('Failed to compile server!');
        return reject(err);
      }

      return resolve(true);
    });
  });
}

export function cleanServer() {
  return removePromise(config.tools.paths.output.server);
}

export function cleanClient() {
  return removePromise(config.tools.paths.output.client);
}
