import path from 'path';
import { sync as globSync } from 'glob';
import appRootDir from 'app-root-dir';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import OfflinePlugin from 'offline-plugin';

import config from '../../../config';

import ClientConfig from '../../../config/components/ClientConfig';

export default function withServiceWorker(webpackConfig, bundleConfig) {
  if (!config('serviceWorker.enabled')) {
    return webpackConfig;
  }

  webpackConfig.plugins.push(
    new HtmlWebpackPlugin({
      filename: config('serviceWorker.offlinePageFileName'),
      template: `babel-loader!${path.resolve(__dirname, './offlinePageTemplate.js')}`, // eslint-disable-line
      production: true,
      minify: {
        removeComments: true,
        collapseWhitespace: true,
        removeRedundantAttributes: true,
        useShortDoctype: true,
        removeNilAttributes: true,
        removeStyleLinkTypeAttributes: true,
        keepClosingSlash: true,
        minifyJS: true,
        minifyCSS: true,
        minifyURLs: true,
      },
      inject: true,
      custom: {
        config,
        ClientConfig,
      },
    }),
  );

  webpackConfig.plugins.push(
    new OfflinePlugin({
      publicPath: bundleConfig.webPath,
      // When using the publicPath we need to disable the "relativePaths"
      // feature of this plugin.
      relativePaths: false,
      // Our offline support will be done via a service worker.
      // Read more on them here:
      // http://bit.ly/2f8q7Td
      ServiceWorker: {
        // The name of the service worker script that will get generated.
        output: config('serviceWorker.fileName'),
        // Enable events so that we can register updates.
        events: true,
        publicPath: `/${config('serviceWorker.fileName')}`,
        navigateFallbackURL: `${bundleConfig.webPath}${config('serviceWorker.offlinePageFileName')}`, // eslint-disable-line
      },
      AppCache: false,
      // Which external files should be included with the service worker?
      // Add the polyfill io script as an external if it is enabled.
      externals:
              (
                config('polyfillIO.enabled')
                  ? [config('polyfillIO.url')]
                  : []
              )
        .concat(
          config('serviceWorker.includePublicAssets').reduce((acc, cur) => {
            const publicAssetPathGlob = path.resolve(
              appRootDir.get(),
              config('publicAssetsPath'),
              cur,
            );
            const publicFileWebPaths = acc.concat(
              // First get all the matching public folder files.
              globSync(publicAssetPathGlob, { nodir: true })
                // Then map them to relative paths against the public folder.
                // We need to do this as we need the "web" paths for each one.
                .map(publicFile =>
                  path.relative(
                    path.resolve(appRootDir.get(), config('publicAssetsPath')),
                    publicFile,
                  ),
                )
                // Add the leading "/" indicating the file is being hosted
                // off the root of the application.
                .map(relativePath => `/${relativePath}`),
            );
            return publicFileWebPaths;
          }, []),
        ),
    }),
  );

  return webpackConfig;
}
