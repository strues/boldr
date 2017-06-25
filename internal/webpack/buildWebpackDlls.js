const path = require('path');
const fs = require('fs');
const webpack = require('webpack');
const md5 = require('md5');
const Promise = require('bluebird');
const logger = require('boldr-utils/lib/logger');

const config = require('../config');

// const pkg = require(config.pkgPath);

function buildWebpackDlls() {
  logger.start('Building Webpack vendor DLLs');
  const pkg = JSON.parse(fs.readFileSync(`${process.cwd()}/package.json`, 'utf8'));

  const dllConfig = config.vendorFiles;

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

  const vendorDLLHashFilePath = path.resolve(config.assetsDir, 'boldrDLLs__hash');

  function webpackInstance() {
    return {
      // We only use this for development, so lets always include source maps.
      devtool: 'inline-source-map',
      entry: {
        ['boldrDLLs']: devDLLDependencies,
      },
      output: {
        path: config.assetsDir,
        filename: 'boldrDLLs.js',
        library: 'boldrDLLs',
      },
      plugins: [
        new webpack.DllPlugin({
          path: path.resolve(config.assetsDir, 'boldrDLLs.json'),
          name: 'boldrDLLs',
          context: config.rootDir,
        }),
      ],
    };
  }

  function buildVendorDLL() {
    return new Promise((resolve, reject) => {
      logger.info(
        `The following dependencies are
        included:\n\t-${devDLLDependencies.join('\n\t-')}\n`,
      );

      const webpackConfig = webpackInstance();
      const vendorDLLCompiler = webpack(webpackConfig);
      vendorDLLCompiler.run(err => {
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
      logger.task('Generating a new Vendor DLL.');
      buildVendorDLL().then(resolve).catch(reject);
    } else {
      // first check if the md5 hashes match
      const dependenciesHash = fs.readFileSync(vendorDLLHashFilePath, 'utf8');
      const dependenciesChanged = dependenciesHash !== currentDependenciesHash;

      if (dependenciesChanged) {
        logger.info('New vendor dependencies detected.');
        logger.task('Regenerating the vendor dll...');
        buildVendorDLL().then(resolve).catch(reject);
      } else {
        logger.end('Dependencies did not change. Using existing vendor dll.');
        resolve();
      }
    }
  });
}

module.exports = buildWebpackDlls;
