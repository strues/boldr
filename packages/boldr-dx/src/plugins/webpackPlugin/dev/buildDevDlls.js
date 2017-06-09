/* @flow */
import path from 'path';
import fs from 'fs-extra';
import webpack from 'webpack';
import DllPlugin from 'webpack/lib/DllPlugin';
import md5 from 'md5';
import _debug from 'debug';
import logger from 'boldr-utils/lib/logger';

const debug = _debug('boldr:dx:devDllPlugin');

function buildDevDlls(config: Config) {
  logger.start('Building Webpack vendor DLLs');
  const pkg = JSON.parse(fs.readFileSync(`${process.cwd()}/package.json`, 'utf8'));

  const dllConfig = config.bundle.vendor;
  const devDLLDependencies = dllConfig.sort();

  // We calculate a hash of the package.json's dependencies, which we can use
  // to determine if dependencies have changed since the last time we built
  // the vendor dll.
  const currentDependenciesHash = md5(
    JSON.stringify(
      devDLLDependencies.map(dep => [dep, pkg.dependencies[dep], pkg.devDependencies[dep]]),
      // We do this to include any possible version numbers we may have for
      // a dependency. If these change then our hash should too, which will
      // result in a new dev dll build.
    ),
  );

  const vendorDLLHashFilePath = path.resolve(config.bundle.assetsDir, '__vendor_dlls__hash');

  function webpackInstance() {
    return {
      // We only use this for development, so lets always include source maps.
      devtool: 'inline-source-map',
      entry: {
        ['__vendor_dlls__']: devDLLDependencies,
      },
      output: {
        path: config.bundle.assetsDir,
        filename: '__vendor_dlls__.js',
        library: '__vendor_dlls__',
      },
      plugins: [
        new DllPlugin({
          path: path.resolve(config.bundle.assetsDir, '__vendor_dlls__.json'),
          name: '__vendor_dlls__',
        }),
      ],
    };
  }

  function buildVendorDLL() {
    return new Promise((resolve, reject) => {
      logger.end('Vendor DLL build complete.');
      logger.info(`The following dependencies have been
        included:\n\t-${devDLLDependencies.join('\n\t-')}\n`);

      const webpackConfig = webpackInstance();
      const vendorDLLCompiler = webpack(webpackConfig);
      vendorDLLCompiler.run(err => {
        if (err) {
          return reject(err);
        }
        // Update the dependency hash
        fs.writeFileSync(vendorDLLHashFilePath, currentDependenciesHash);

        return resolve();
      });
    });
  }

  return new Promise((resolve, reject) => {
    if (!fs.existsSync(vendorDLLHashFilePath)) {
      // builddll
      logger.task('Generating a new Vendor DLL.');
      return buildVendorDLL().then(resolve).catch(reject);
    }
    // first check if the md5 hashes match
    const dependenciesHash = fs.readFileSync(vendorDLLHashFilePath, 'utf8');
    const dependenciesChanged = dependenciesHash !== currentDependenciesHash;

    if (dependenciesChanged) {
      logger.info('New vendor dependencies detected.');
      logger.task('Regenerating the vendor dll...');
      return buildVendorDLL().then(resolve).catch(reject);
    }
    logger.end('Dependencies did not change. Using existing vendor dll.');
    return resolve();
  });
}

export default buildDevDlls;
