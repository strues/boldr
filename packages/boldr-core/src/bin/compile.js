/* eslint-disable require-await, max-statements */
import fs from 'fs-extra';
import _debug from 'debug';
import webpackCompiler from '../webpack/webpack-compiler';
import webpackConfigClient from '../webpack/webpack.config.client';
import webpackConfigServer from '../webpack/webpack.config.server';
import defaultConfig from '../config';

const debug = _debug('boldr:core:bin:compile');

export default class Compiler {
  static compile = async userConfig => {
    try {
      const config = defaultConfig(userConfig);
      const paths = config.boundPath;
      const clientInfo = paths.assets(config.universal.clientStats);
      const clientConfig = webpackConfigClient(config);
      let stats;

      debug('Run compiler for client');
      stats = await webpackCompiler(clientConfig);
      if (stats.warnings.length && config.compilerFailOnWarning) {
        debug('Config set to fail on warning, exiting with status code "1".');
        process.exit(1);
      }

      debug('Write client info');
      const { hash, version, assetsByChunkName } = stats;
      await new Promise((resolve, reject) => {
        fs.writeJson(clientInfo, { hash, version, assetsByChunkName }, err => {
          if (err) {
            reject(err);
          }
          resolve(true);
        });
      });

      debug('Run compiler for server');
      const serverConfig = webpackConfigServer(config);
      stats = await webpackCompiler(serverConfig);
      if (stats.warnings.length && config.compilerFailOnWarning) {
        debug('Config set to fail on warning, exiting with status code "1".');
        process.exit(1);
      }

      debug('Copying static from src to compiled/public.');
      fs.copySync(paths.src('static'), paths.public());

      debug('Copying images from compiled to compiled/public/assets');
      if (fs.existsSync(paths.assets('img'))) {
        fs.copySync(paths.compiled('img'), paths.assets('img'));
        fs.removeSync(paths.compiled('img'));
      }

      if (fs.existsSync(paths.compiled('img'))) {
        fs.copySync(paths.compiled('fonts'), paths.assets('fonts'));
        fs.removeSync(paths.compiled('fonts'));
      }
    } catch (e) {
      debug('Compiler encountered an error.', e);
      process.exit(1);
    }
  };
}
