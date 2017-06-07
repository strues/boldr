import path from 'path';
import webpack from 'webpack';
import _debug from 'debug';
import dotenv from 'dotenv';
import removeNil from 'boldr-tools/es/arrays/removeNil';
import ifElse from 'boldr-tools/es/logic/ifElse';

import nodeExternals from 'webpack-node-externals';
import cssnano from 'cssnano';
import WriteFilePlugin from 'write-file-webpack-plugin';
import CaseSensitivePathsPlugin from 'case-sensitive-paths-webpack-plugin';
import CircularDependencyPlugin from 'circular-dependency-plugin';
import PATHS from '../internal/paths';

import { cssLoaderConfig, postCssLoaderConfig, sassLoaderConfig } from './util/styleLoaders';

export default config => {
  const debug = _debug('boldr:core:webpack:serverConfig');
  dotenv.load();
  const paths = config.boundPath;
  const isDev = process.env.NODE_ENV === 'development';
  const isProd = process.env.NODE_ENV === 'production';

  const __DEV__ = isDev;
  const __PROD__ = isProd;
  const ifDev = ifElse(isDev);

  debug('Building webpack server bundle config');
  const PREFETCHES = [
    path.join(paths.boldr(), 'core/AppContainer.js'),
    path.join(paths.boldr(), 'core/htmlAttributes.js'),
    path.join(paths.src(), 'state/reducers.js'),
  ];

  const prefetchPlugins = PREFETCHES.map(specifier => new webpack.PrefetchPlugin(specifier));

  const serverWebpackConfig = {
    name: 'server',
    target: 'node',
    devtool: isDev ? 'source-map' : false,
    // boldr-core/lib/framework/server/entry
    entry: [paths.serverDir('entry.js')],
    cache: isDev,
    output: {
      filename: 'server.js',
      // CWD/compiled/
      path: paths.compiled(),
      pathinfo: isDev,
      libraryTarget: 'commonjs',
      publicPath: `${config.compilerPublicPath}static/`,
    },
    resolve: {
      modules: ['node_modules', paths.src()].concat(PATHS.nodePaths),
      mainFields: ['module', 'jsnext:main', 'main'],
      extensions: ['.js', '.jsx', '.json'],
      alias: {
        '~': path.join(paths.src()),
        static: path.join(paths.src(), 'static'),
        '~static': path.join(paths.src(), 'static'),
        '~components': path.join(paths.src(), 'components'),
        '@@AppContainer': path.join(PATHS.boldrDir, 'core/AppContainer.js'),
        '@@HtmlAttributes': path.join(PATHS.boldrDir, 'core/htmlAttributes.js'),
        '@@AppReducers': path.join(PATHS.srcDir, 'state/reducers.js'),
      },
    },
    resolveLoader: {
      modules: [PATHS.boldrNodeModules, PATHS.projectNodeModules],
    },
    externals: nodeExternals({
      whitelist: [
        'source-map-support/register',
        /\.(eot|woff|woff2|ttf|otf)$/,
        /\.(svg|png|jpg|jpeg|gif|ico)$/,
        /\.(mp4|mp3|ogg|swf|webp)$/,
        /\.(css|scss)$/,
      ],
    }),
    module: {
      noParse: [/\.min\.js/],
      rules: [
        {
          test: /\.(js|jsx)$/,
          // include: bundle.srcDir,
          exclude: /node_modules/,
          use: removeNil([
            ifDev({
              loader: 'cache-loader',
              options: {
                // provide a cache directory where cache items should be stored
                cacheDirectory: PATHS.cacheDir,
              },
            }),
            {
              loader: 'babel-loader',
              options: {
                babelrc: false,
                compact: true,
                sourceMaps: true,
                comments: false,
                presets: [require.resolve('babel-preset-boldr/node')],
                plugins: [
                  [
                    require.resolve('./util/loadableBabel.js'),
                    {
                      server: true,
                      webpack: false,
                    },
                  ],
                  [
                    require.resolve('babel-plugin-styled-components'),
                    {
                      ssr: true,
                    },
                  ],
                ],
              },
            },
          ]),
        },
        {
          test: /\.scss$/,
          use: [{ loader: 'css-loader/locals' }, postCssLoaderConfig, { loader: 'sass-loader' }],
        },
        {
          test: /\.css$/,
          use: [{ loader: 'css-loader/locals' }, postCssLoaderConfig],
        },

        {
          test: /\.(png|jpg|jpeg|gif|svg|woff|woff2)$/,
          loader: 'url-loader',
          exclude: /node_modules/,
          options: { limit: 10000, emitFile: false },
        },
        {
          test: /\.svg(\?v=\d+.\d+.\d+)?$/,
          exclude: /node_modules/,
          loader: 'url-loader?limit=10000&mimetype=image/svg+xml&name=[name].[ext]', // eslint-disable-line
        },
        // file
        {
          test: /\.(ico|eot|ttf|otf|mp4|mp3|ogg|pdf|html)$/, // eslint-disable-line
          loader: 'file-loader',
          exclude: /node_modules/,
          options: {
            emitFile: false,
          },
        },
      ],
    },

    plugins: [
      ...prefetchPlugins,
      new webpack.LoaderOptionsPlugin({
        minimize: !isDev,
        debug: isDev,
        options: {
          context: __dirname,
        },
      }),
      new webpack.DefinePlugin({
        __DEV__: JSON.stringify(isDev),
        'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
        'process.env.SERVER_PORT': JSON.stringify(process.env.SERVER_PORT),
        __CLIENT__: false,
        __SERVER__: true,
        GRAPHQL_URL: JSON.stringify(process.env.GRAPHQL_URL),
        __WEBPACK_MANIFEST__: JSON.stringify(
          path.join(paths.static() || '', 'webpack-manifest.json'),
        ),
        __CHUNK_MANIFEST__: JSON.stringify(path.join(paths.static() || '', 'chunk-manifest.json')),
      }),
      new webpack.ContextReplacementPlugin(/moment[\\]locale$/, /en/),
    ],
  };
  if (isDev) {
    serverWebpackConfig.plugins.push(
      new WriteFilePlugin({ log: false }),
      new CaseSensitivePathsPlugin(),
      new CircularDependencyPlugin({
        exclude: /a\.js|node_modules/,
        // show a warning when there is a circular dependency
        failOnError: false,
      }),
    );
  }
  return serverWebpackConfig;
};
