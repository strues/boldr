
import webpack from 'webpack';
import { resolve as pathResolve } from 'path';
import appRootDir from 'app-root-dir';
import md5 from 'md5';
import fs from 'fs';
import { sync as globSync } from 'glob';
import matchRequire from 'match-require';
import defaults from 'lodash/defaultsDeep';

import boldrConfig from '../../config/boldr';
import plugConfig from '../../config/plugins';
import { log } from '../utils';

function createVendorDLL(bundleName, bundleConfig) {
  // $FlowFixMe
  const packageJSON = require(pathResolve(appRootDir.get(), './package.json'));
  const dllConfig = defaults(packageJSON.dll, boldrConfig.bundles.client.devVendorDLL);

  // We calculate a hash of the package.json's dependencies, which we can use
  // to determine if dependencies have changed since the last time we built
  // the vendor dll.
  const currentDependenciesHash = md5(JSON.stringify(packageJSON.dependencies));

  const vendorDLLHashFilePath = pathResolve(
    appRootDir.get(),
    bundleConfig.outputPath,
    `${bundleConfig.devVendorDLL.name}_hash`,
  );

  function webpackConfigFactory() {
    return {
      // We only use this for development, so lets always include source maps.
      devtool: 'inline-source-map',
      entry: dllConfig.dlls ? dllConfig.dlls : plugConfig.bundles.devVendorDLL.entry(packageJSON),
      output: {
        path: pathResolve(appRootDir.get(), bundleConfig.outputPath),
        filename: `${bundleConfig.devVendorDLL.name}.js`,
        library: bundleConfig.devVendorDLL.name,
      },
      plugins: [
        new webpack.DllPlugin({
          path: pathResolve(
            appRootDir.get(),
            bundleConfig.outputPath,
            `./${bundleConfig.devVendorDLL.name}.json`,
          ),
          name: bundleConfig.devVendorDLL.name,
        }),
      ],
    };
  }

  function buildVendorDLL() {
    return new Promise((resolve, reject) => {
      log({
        title: 'vendorDLL',
        level: 'info',
        message: 'Vendor DLL build complete. Modules list:',
      });

      const webpackConfig = webpackConfigFactory();
      const vendorDLLCompiler = webpack(webpackConfig);
      vendorDLLCompiler.run((err) => {
        if (err) {
          reject(err);
          return;
        }
          // Update the dependency hash
        fs.writeFileSync(vendorDLLHashFilePath, currentDependenciesHash);

        resolve();
      });
    });
  }

  return new Promise((resolve, reject) => {
    if (!fs.existsSync(vendorDLLHashFilePath)) {
      // builddll
      log({
        title: 'vendorDLL',
        level: 'warn',
        message: `Generating a new "${bundleName}" vendor dll for boosted development performance...`,
      });
      buildVendorDLL().then(resolve).catch(reject);
    } else {
      // first check if the md5 hashes match
      const dependenciesHash = fs.readFileSync(vendorDLLHashFilePath, 'utf8');
      const dependenciesChanged = dependenciesHash !== currentDependenciesHash;

      if (dependenciesChanged) {
        log({
          title: 'vendorDLL',
          level: 'warn',
          message: `New "${bundleName}" vendor dependencies detected. Regenerating the vendor dll...`,
        });
        buildVendorDLL().then(resolve).catch(reject);
      } else {
        log({
          title: 'vendorDLL',
          level: 'info',
          message: `No changes to existing "${bundleName}" vendor dependencies. Using the existing vendor dll.`,
        });
        resolve();
      }
    }
  });
}

export default createVendorDLL;
