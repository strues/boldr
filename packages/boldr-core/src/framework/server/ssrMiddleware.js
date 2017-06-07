/**
 * @module boldr/framework/server/ssrMiddleware
 */
import path from 'path';
import webpack from 'webpack';
import _debug from 'debug';
import logger from 'boldr-tools/es/logger';
import createWebpackServerConfig from '../../webpack/createWebpackServerConfig';
import getDefault from '../../internal/getDefault';

export default class Ssr {
  constructor(config) {
    this.config = config;
  }

  async init() {
    const debug = _debug('boldr:core:framework:server:ssr');

    const { useCompiledServer } = this.config;
    // output = CWD/compiled/server.js
    const output = this.config.boundPath.compiled(this.config.universal.output);
    if (!useCompiledServer) {
      try {
        await new Promise((resolve, reject) => {
          const serverConfig = createWebpackServerConfig(this.config);
          const compiler = webpack(serverConfig);

          compiler.plugin('done', stats => {
            resolve(true);
          });

          compiler.run((err, stats) => {
            if (err) {
              reject(err);
            }
          });
        });
      } catch (error) {
        logger.error('Error compiling server', error);
        return Promise.reject(error);
      }
    }

    // require(CWD/compiled/server.js)(config)
    return Promise.resolve(getDefault(require(output))(this.config));
  }
}
