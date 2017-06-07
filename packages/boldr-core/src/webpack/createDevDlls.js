import path from 'path';
import fs from 'mz/fs';
import md5 from 'md5';
import webpack from 'webpack';
import logger from 'boldr-tools/es/logger';
import DllPlugin from 'webpack/lib/DllPlugin';
import pkgUp from 'pkg-up';
import PATHS from '../internal/paths';

const outputDir = PATHS.clientOutputPath;
const pkgAppPath = pkgUp.sync('.');
const appPackage = JSON.parse(fs.readFileSync(pkgAppPath, 'utf8'));

export default function createDevDlls(config) {
  logger.start('Running development DLL task.');
  const vendorsToInclude = config.compilerVendor;
  const dllDependencies = vendorsToInclude.sort();
  const currentDependenciesHash = md5(
    JSON.stringify(
      dllDependencies.map(dep => [
        dep,
        appPackage.dependencies[dep],
        appPackage.devDependencies[dep],
      ]),
    ),
  );

  // const dependencyNames = Object.keys(appPackage.dependencies);
  // const includeDependencies = uniq(dependencyNames.concat(include || []));
  const vendorDLLHashFilePath = path.join(config.boundPath.static(), 'boldrDLLs_hash');
  function webpackConfigFactory() {
    return {
      devtool: 'inline-source-map',
      entry: {
        ['boldrDLLs']: dllDependencies,
      },
      output: {
        path: config.boundPath.static(),
        filename: 'boldrDLLs.js',
        library: 'boldrDLLs',
      },
      plugins: [
        new DllPlugin({
          path: path.join(config.boundPath.static(), 'boldrDLLs.json'),
          name: 'boldrDLLs',
        }),
      ],
    };
  }
  function buildVendorDLL() {
    return new Promise((resolve, reject) => {
      logger.task(
        `Building the DLL bundle with the following dependencies:\n\t-${dllDependencies.join(
          '\n\t-',
        )}\n`,
      );

      const webpackConfig = webpackConfigFactory();
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
      logger.info('DLL bundle not found. Creating a new one now.');
      buildVendorDLL().then(resolve).catch(reject);
    } else {
      // first check if the md5 hashes match
      const dependenciesHash = fs.readFileSync(vendorDLLHashFilePath, 'utf8');
      const dependenciesChanged = dependenciesHash !== currentDependenciesHash;

      if (dependenciesChanged) {
        logger.task('Detected new dependencies. Rebuilding the DLL bundle.');
        buildVendorDLL().then(resolve).catch(reject);
      } else {
        logger.end('Dll hashes match. No need to recompile the DLL bundle.');
        resolve();
      }
    }
  });
}
