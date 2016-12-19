import webpack from 'webpack';
import appRootDir from 'app-root-dir';
import { resolve as pathResolve } from 'path';
import webpackConfigFactory from '../webpack/configFactory';
import boldrConfig from '../../config/private/boldr';
import { exec } from '../utils';

// First clear the build output dir.
exec(`rimraf ${pathResolve(appRootDir.get(), boldrConfig.buildOutputPath)}`);

// Get our "fixed" bundle names
Object.keys(boldrConfig.bundles)
// And the "additional" bundle names
.concat(Object.keys(boldrConfig.additionalNodeBundles))
// And then build them all.
.forEach((bundleName) => {
  const compiler = webpack(
    webpackConfigFactory({ target: bundleName, mode: 'production' }),
  );
  compiler.run(() => console.log(`"${bundleName}" bundle built.`));
});
