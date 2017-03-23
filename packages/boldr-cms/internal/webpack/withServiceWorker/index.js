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
      template: `babel-loader!${path.resolve(__dirname, './offlinePageTemplate.js')}`,
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

      relativePaths: false,
      ServiceWorker: {
        output: config('serviceWorker.fileName'),
        events: true,
        publicPath: `/${config('serviceWorker.fileName')}`,
        navigateFallbackURL: `${bundleConfig.webPath}${config('serviceWorker.offlinePageFileName')}`,
      },
      AppCache: false,
      externals:
        (
          config('polyfillIO.enabled')
            ? [config('polyfillIO.url')]
            : []
        )
        .concat(
          config('serviceWorker.includePublicAssets').reduce((acc, cur) => {
            const publicAssetPathGlob = path.resolve(
              appRootDir.get(), config('publicAssetsPath'), cur,
            );
            const publicFileWebPaths = acc.concat(
              globSync(publicAssetPathGlob, { nodir: true })
              .map(publicFile => path.relative(
                path.resolve(appRootDir.get(), config('publicAssetsPath')),
                publicFile,
              ))
              .map(relativePath => `/${relativePath}`),
            );
            return publicFileWebPaths;
          }, []),
        ),
    }),
  );

  return webpackConfig;
}
