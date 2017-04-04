import fs from 'fs';
import { resolve as pathResolve } from 'path';
import webpack from 'webpack';
import appRootDir from 'app-root-dir';
import md5 from 'md5';
import { log } from '../utils';
import config from '../../config';

function buildDevDlls(bundleName, bundleConfig) {
  const dllConfig = config('bundles.client.devDlls');

  // $FlowFixMe
  const pkg = require(pathResolve(appRootDir.get(), './package.json'));

  const devDLLDependencies = dllConfig.include.sort();

  const currentDependenciesHash = md5(JSON.stringify(
    devDLLDependencies.map(dep =>
      [dep, pkg.dependencies[dep], pkg.devDependencies[dep]],
    ),
  ));

  const vendorDLLHashFilePath = pathResolve(
    appRootDir.get(),
    bundleConfig.outputPath,
    `${dllConfig.name}_hash`,
  );

  function webpackConfigFactory() {
    return {
      devtool: 'inline-source-map',
      entry: {
        [dllConfig.name]: devDLLDependencies,
      },
      output: {
        path: pathResolve(appRootDir.get(), bundleConfig.outputPath),
        filename: `${dllConfig.name}.js`,
        library: dllConfig.name,
      },
      plugins: [
        new webpack.DllPlugin({
          path: pathResolve(
            appRootDir.get(),
            bundleConfig.outputPath,
            `./${dllConfig.name}.json`,
          ),
          name: dllConfig.name,
        }),
      ],
    };
  }

  function buildVendorDLL() {
    return new Promise((resolve, reject) => {
      log({
        title: 'vendorDLL',
        level: 'info',
        message: `The following 🚧 dependencies have been included:\n\t-${devDLLDependencies.join('\n\t-')}\n`,
      });

      const webpackConfig = webpackConfigFactory();
      const vendorDLLCompiler = webpack(webpackConfig);
      vendorDLLCompiler.run(err => {
        if (err) {
          reject(err);
          return;
        }
        fs.writeFileSync(vendorDLLHashFilePath, currentDependenciesHash);

        resolve();
      });
    });
  }

  return new Promise(async (resolve, reject) => {
    if (!fs.existsSync(vendorDLLHashFilePath)) {
      log({
        title: 'vendorDLL',
        level: 'warn',
        message: `Generating a new "${bundleName}" Vendor DLL for boosted development performance`,
      });
      await buildVendorDLL().then(resolve).catch(reject);
    } else {
      const dependenciesHash = fs.readFileSync(vendorDLLHashFilePath, 'utf8');
      const dependenciesChanged = dependenciesHash !== currentDependenciesHash;

      if (dependenciesChanged) {
        log({
          title: 'vendorDLL',
          level: 'warn',
          message: `New "${bundleName}" vendor dependencies detected. Regenerating the vendor dll...`,
        });
        await buildVendorDLL().then(resolve).catch(reject);
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

export default buildDevDlls;
