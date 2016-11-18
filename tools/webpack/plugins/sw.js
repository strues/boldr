const SWPrecacheWebpackPlugin = require('sw-precache-webpack-plugin');
const appRoot = require('app-root-dir');
const path = require('path');
const os = require('os');
const globSync = require('glob').sync;
const { removeEmpty, ifElse, merge, happyPackPlugin, chalkError, chalkInfo } = require('../../utils');
const envVars = require('../../config/envVars');
const defs = require('../../config/defs');
const appName = require('../../../package.json').name;

const appRootPath = appRoot.get();

// Service Worker.
// @see https://github.com/goldhand/sw-precache-webpack-plugin
// This plugin generates a service worker script which as configured below
// will precache all our generated client bundle assets as well as the
// index page for our application.
// This gives us aggressive caching as well as offline support.
// Don't worry about cache invalidation. As we are using the Md5HashPlugin
// for our assets, any time their contents change they will be given
// unique file names, which will cause the service worker to fetch them.
const swPlugin = (json) => {
  new SWPrecacheWebpackPlugin(merge({
          // Note: The default cache size is 2mb. This can be reconfigured:
          // maximumFileSizeToCacheInBytes: 2097152,
          cacheId: `${appName}-sw`,
          filepath: path.resolve(envVars.BUNDLE_OUTPUT_PATH, './serviceWorker/sw.js'),
          dynamicUrlToDependencies: (() => {
            const clientBundleAssets = globSync(
              path.resolve(appRootPath, envVars.BUNDLE_OUTPUT_PATH, './client/*.js')
            );
            return globSync(path.resolve(appRootPath, './public/*'))
              .reduce((acc, cur) => {
                // We will precache our public asset, with it being invalidated
                // any time our client bundle assets change.
                acc[`/${path.basename(cur)}`] = clientBundleAssets; // eslint-disable-line no-param-reassign,max-len
                return acc;
              },
              {
                // Our index.html page will be precatched and it will be
                // invalidated and refetched any time our client bundle
                // assets change.
                '/': clientBundleAssets,
                // Lets cache the call to the polyfill.io service too.
                'https://cdn.polyfill.io/v2/polyfill.min.js': clientBundleAssets,
              });
            })(),
          },
          ifElse(!!json)({
            // When outputing a json stat file we want to silence the output.
            verbose: false,
            logger: () => undefined,
          })
        )
      )
}
module.exports = swPlugin;
