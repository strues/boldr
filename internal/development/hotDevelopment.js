/* eslint-disable eqeqeq */
import { resolve as pathResolve } from 'path';
import webpack from 'webpack';
import appRootDir from 'app-root-dir';
import { log } from '../util';
import webpackConfigFactory from '../webpack/configFactory';
import config from '../../config';
import HotNodeServer from './hotNodeServer';
import HotClientServer from './hotClientServer';
import buildDevDlls from './buildDevDll';

const usesDevDlls = bundleConfig =>
  bundleConfig.devDlls != null && bundleConfig.devDlls.enabled;

const vendorDLLsFailed = err => {
  log({
    title: 'vendorDLL',
    level: 'error',
    message: 'Unfortunately an error occured whilst trying to build the vendor dll(s) used by the development server.',
    notify: false,
  });
  if (err) {
    console.error(err);
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
        webpackConfig.plugins.push(new webpack.DllReferencePlugin({
          // $FlowFixMe
          manifest: require(
            pathResolve(
              appRootDir.get(),
              bundleConfig.outputPath,
              `${bundleConfig.devDlls.name}.json`,
            ),
          ),
        }));
      }
      return webpack(webpackConfig);
    } catch (err) {
      log({
        title: 'development',
        level: 'error',
        message: 'Webpack config is invalid, please check the console for more information.',
        notify: false,
      });
      console.error(err);
      throw err;
    }
  };
  return { name, bundleConfig, createCompiler };
};

class HotDevelopment {
  constructor() {
    this.hotClientServer = null;
    this.hotNodeServers = [];

    const clientBundle = initializeBundle('client', config('bundles.client'));

    const nodeBundles = [initializeBundle('server', config('bundles.server'))]
    .concat(Object.keys(config('additionalNodeBundles')).map(name =>
        initializeBundle(name, config('additionalNodeBundles')[name])));

    Promise.resolve(
      usesDevDlls(config('bundles.client'))
        ? buildDevDlls('client', config('bundles.client'))
        : true,
    )
      // Then start the client development server.
      .then(
        () => new Promise(resolve => {
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
          ({ name, createCompiler }) => // $FlowFixMe
          new HotNodeServer(name, createCompiler(), clientCompiler),
        );
      });
  }

  dispose() {
    const safeDisposer = server =>
      server ? server.dispose() : Promise.resolve();

    // First the hot client server.
    return safeDisposer(
      this.hotClientServer,
    )// Then dispose the hot node server(s).
    .then(() => Promise.all(this.hotNodeServers.map(safeDisposer)));
  }
}

export default HotDevelopment;
