/* eslint-disable eqeqeq */
import { resolve as pathResolve } from 'path';
import webpack from 'webpack';
import appRootDir from 'app-root-dir';
import logger from 'boldr-utils/es/logger';
import webpackConfigFactory from '../webpack/configFactory';
import config from '../../config';
import HotNodeServer from './hotNodeServer';
import HotClientServer from './hotClientServer';
import buildDevDlls from './buildDevDll';

const debug = require('debug')('boldr:webpack');

const usesDevDlls = bundleConfig =>
  bundleConfig.devDlls != null && bundleConfig.devDlls.enabled;

const vendorDLLsFailed = err => {
  logger.error('An error occured whilst trying to build the vendor dll(s).');
  if (err) {
    debug(err);
  }
};

const initializeBundle = (name, bundleConfig) => {
  const createCompiler = () => {
    try {
      const webpackConfig = webpackConfigFactory({
        target: name,
        mode: 'development',
      });
      // Install the vendor DLL config for the client bundle if required.
      if (name === 'client' && usesDevDlls(bundleConfig)) {
        // Install the vendor DLL plugin.
        webpackConfig.plugins.push(
          new webpack.DllReferencePlugin({
            // $FlowFixMe
            manifest: require(pathResolve(
              appRootDir.get(),
              bundleConfig.outputPath,
              `${bundleConfig.devDlls.name}.json`,
            )),
          }),
        );
      }
      return webpack(webpackConfig);
    } catch (err) {
      logger.error('Webpack config is invalid.');
      debug(err);
      throw err;
    }
  };
  return {
    name,
    bundleConfig,
    createCompiler,
  };
};

class HotDevelopment {
  constructor() {
    this.hotClientServer = null;
    this.hotNodeServers = [];

    const clientBundle = initializeBundle('client', config('bundles.client'));

    const nodeBundles = [
      initializeBundle('server', config('bundles.server')),
    ].concat(
      Object.keys(config('additionalNodeBundles')).map(name =>
        initializeBundle(name, config('additionalNodeBundles')[name]),
      ),
    );

    Promise.resolve(
      usesDevDlls(config('bundles.client'))
        ? buildDevDlls('client', config('bundles.client'))
        : true,
    )
      // Then start the client development server.
      .then(
        () =>
          new Promise(resolve => {
            const { createCompiler } = clientBundle;
            const compiler = createCompiler();
            compiler.plugin('done', stats => {
              if (!stats.hasErrors()) {
                resolve(compiler);
              }
            });
            this.hotClientServer = new HotClientServer(compiler);
          }),
        vendorDLLsFailed,
      )
      // Then start the node development server(s).
      .then(clientCompiler => {
        this.hotNodeServers = nodeBundles.map(
          ({ name, createCompiler }) =>
            new HotNodeServer(name, createCompiler(), clientCompiler),
        );
      });
  }

  dispose() {
    const safeDisposer = server =>
      (server ? server.dispose() : Promise.resolve());

    // First the hot client server.
    return safeDisposer(this.hotClientServer).then(() =>
      Promise.all(this.hotNodeServers.map(safeDisposer)),
    );
  }
}

export default HotDevelopment;
