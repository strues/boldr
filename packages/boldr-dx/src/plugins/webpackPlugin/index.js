/* @flow */
/* eslint-disable global-require, no-console, require-await */
import path from 'path';
import fs from 'fs-extra';
import _debug from 'debug';
import webpack from 'webpack';
import terminate from 'terminate';
import execa from 'execa';
import getDefault from 'boldr-utils/lib/node/getDefault';
import logger from 'boldr-utils/lib/logger';

import loadConfiguration from '../../config/loadConfig';
import createSingleCompiler from './compilers/createSingleCompiler';
import buildDevDlls from './dev/buildDevDlls';
import createBrowserWebpack from './createBrowserWebpack';
import createNodeWebpack from './createNodeWebpack';

const debug = _debug('boldr:dx:plugins:webpack');

const plugin: Plugin = (engine: Engine, runOnce: boolean = false): PluginController => {
  const { engine: envVariables, bundle } = engine.getConfiguration();
  return {
    async build() {
      const config: Config = loadConfiguration(this);

      const clientConfig = createBrowserWebpack({
        config,
        mode: 'production',
        name: 'client',
      });
      const serverConfig = createNodeWebpack({
        config,
        mode: 'production',
        name: 'server',
      });

      fs.removeSync(config.bundle.client.bundleDir);
      fs.removeSync(config.bundle.server.bundleDir);

      const compilers = [createSingleCompiler(clientConfig), createSingleCompiler(serverConfig)];

      return Promise.all(compilers);
    },
    async start() {
      return Promise.resolve();
    },
    async dev() {
      logger.start('Starting development bundling process.');
      const config = engine.getConfiguration();
      await buildDevDlls(config);

      // instantiate plugins
      // eslint-disable-next-line babel/new-cap
      const BoldrDev = getDefault(require('./dev/boldrDev'));

      // Create a new development devServer.
      const devServer = new BoldrDev(config);

      ['SIGINT', 'SIGTERM'].forEach(signal => {
        process.on(signal, () => {
          devServer.shutdown();
          process.exit(0);
        });
      });

      process.on('exit', () => {
        logger.end('Development stopped. 💠  All listeners removed.');
      });
    },

    async end() {
      if (serverCompiler) {
        terminate(process.pid, err => {
          if (err) {
            debug(`ERR RESTART: ${err}`);
          } else {
            logger.task('Terminated.');
          }
        });
      }

      return true;
    },
  };
};

module.exports = plugin;
