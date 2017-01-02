/* @flow */

// Project configuration.
//
// Note: all file/folder paths should be relative to the project root. The
// absolute paths should be resolved during runtime by our build tools/server.

import type { BuildOptions } from '../tools/types';
import { getStringEnvVar, getIntEnvVar } from './internals/environmentVars';
import filterObject from './internals/filterObject';
import clientConfigFilter from './clientConfigFilter';

// This protects us from accidentally including this configuration in our
// client bundle. That would be a big NO NO to do. :)
if (process.env.IS_CLIENT) {
  throw new Error("You shouldn't be importing the `./config` directly into your 'client' or 'shared' source as the configuration object will get included in your client bundle. Not a safe move! Instead, use the `safeConfigGet` helper function (located at `./src/shared/utils/config`) within the 'client' or 'shared' source files to reference configuration values in a safe manner."); // eslint-disable-line
}

const config = {
  // The host on which the server should run.
  host: getStringEnvVar('SERVER_HOST', 'localhost'),

  // The port on which the server should run.
  port: getIntEnvVar('SERVER_PORT', 1337),
  apiHost: getStringEnvVar('API_HOST', 'localhost'),
  apiPort: getIntEnvVar('API_PORT', 2121),

  // The port on which the client bundle development server should run.
  clientDevServerPort: getIntEnvVar('CLIENT_DEVSERVER_PORT', 7331),

  // This is an example environment variable which is consumed within the
  // './client.js' config.  See there for more details.
  welcomeMessage: getStringEnvVar('WELCOME_MSG', 'Hello world!'),

  // Disable server side rendering?
  disableSSR: false,

  // How long should we set the browser cache for the served assets?
  // Don't worry, we add hashes to the files, so if they change the new files
  // will be served to browsers.
  // We are using the "ms" format to set the length.
  // @see https://www.npmjs.com/package/ms
  browserCacheMaxAge: '365d',

  // Path to the public assets that will be served off the root of the
  // HTTP server.
  publicAssetsPath: './public',

  // Where does our build output live?
  buildOutputPath: './boldr/boldrCMS',

  // Should we optimize production builds (i.e. minify etc).
  // Sometimes you don't want this to happen to aid in debugging complex
  // problems.  Having this configuration flag here allows you to quickly
  // toggle the feature.
  optimizeProductionBuilds: true,

  // Do you want to included source maps (will be served as seperate files)
  // for production builds?
  includeSourceMapsForProductionBuilds: false,

  // Path to the shared src between the bundles.
  bundlesSharedSrcPath: './src/shared',

  // These extensions are tried when resolving src files for our bundles..
  bundleSrcTypes: ['js', 'jsx', 'json'],
  useCSP: true,
  // Additional asset types to be supported for our bundles.
  // i.e. you can import the following file types within your source and the
  // webpack bundling process will bundle them with your source and create
  // URLs for them that can be resolved at runtime.
  bundleAssetTypes: [
    'jpg',
    'jpeg',
    'png',
    'gif',
    'ico',
    'eot',
    'svg',
    'ttf',
    'woff',
    'woff2',
    'otf',
  ],

  // What should we name the json output file that webpack generates
  // containing details of all output files for a bundle?
  bundleAssetsFileName: 'assets.json',

  // Extended configuration for the Content Security Policy (CSP)
  // @see src/server/middleware/security for more info.
  cspExtensions: {
    defaultSrc: [],
    scriptSrc: [],
    styleSrc: [],
    imgSrc: [],
    connectSrc: [],
    fontSrc: [],
    objectSrc: [],
    mediaSrc: [],
    childSrc: [],
  },

  // node_modules are not included in any bundles that target "node" as a runtime
  // (i.e. the server bundle).
  // The node_modules may however contain files that will need to be processed by
  // one of our webpack loaders.
  // Add any required file types to the list below.
  nodeBundlesIncludeNodeModuleFileTypes: [
    /\.(eot|woff|woff2|ttf|otf)$/,
    /\.(svg|png|jpg|jpeg|gif|ico)$/,
    /\.(mp4|mp3|ogg|swf|webp)$/,
    /\.(css|scss)$/,
  ],

  // Note: you can only have a single service worker instance.  Our service
  // worker implementation is bound to the "client" and "server" bundles.
  // It includes the "client" bundle assets, as well as the public folder assets,
  // and it is served by the "server" bundle.
  serviceWorker: {
    // Enabled?
    enabled: true,
    // Service worker name
    fileName: 'sw.js',
    // Paths to the public assets which should be included within our
    // service worker. Relative to our public folder path, and accepts glob
    // syntax.
    includePublicAssets: [
      // NOTE: This will include ALL of our public folder assets.  We do
      // a glob pull of them and then map them to /foo paths as all the
      // public folder assets get served off the root of our application.
      // You may or may not want to be including these assets.  Feel free
      // to remove this or instead include only a very specific set of
      // assets.
      './**/*',
    ],
    // Path to the template used by HtmlWebpackPlugin to generate an offline
    // page that will be used by the service worker to render our application
    // offline.
    offlinePageTemplate: './tools/webpack/offlinePage',
    // Offline page file name.
    offlinePageFileName: 'offline.html',
  },

  // We use the polyfill.io service which provides the polyfills that a
  // client needs, which is far more optimal than the large output
  // generated by babel-polyfill.
  // Note: we have to keep this seperate from our "htmlPage" configuration
  // as the polyfill needs to be loaded BEFORE any of our other javascript
  // gets parsed.
  polyfillIO: {
    enabled: true,
    url: 'https://cdn.polyfill.io/v2/polyfill.min.js',
  },

  // Configuration for the HTML pages (headers/titles/scripts/css/etc).
  // We make use of react-helmet to consume the values below.
  // @see https://github.com/nfl/react-helmet
  htmlPage: {
    htmlAttributes: { lang: 'en' },
    titleTemplate: '%s - Powered by Boldr',
    defaultTitle: 'Boldr',
    meta: [
      {
        name: 'description',
        content: 'Your dreams are bold. Your thoughts are bold. So why shouldn\'t your CMS be a little Boldr?',
      },
      // Default content encoding.
      { name: 'charset', content: 'utf-8' },
      // @see http://bit.ly/2f8IaqJ
      { 'http-equiv': 'X-UA-Compatible', content: 'IE=edge' },
      // This is important to signify your application is mobile responsive!
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      // Providing a theme color is good if you are doing a progressive
      // web application.
      { name: 'theme-color', content: '#2b2b2b' },
    ],
    links: [
      { rel: 'apple-touch-icon', sizes: '180x180', href: '/apple-touch-icon.png' },
      { rel: 'icon', type: 'image/png', href: '/favicon-32x32.png', sizes: '32x32' },
      { rel: 'icon', type: 'image/png', href: '/favicon-16x16.png', sizes: '16x16' },
      { rel: 'mask-icon', href: '/safari-pinned-tab.svg', color: '#00a9d9' },
      // Make sure you update your manifest.json to match your application.
      { rel: 'manifest', href: '/manifest.json' },
    ],
    scripts: [
      // Example:
      // { src: 'http://include.com/pathtojs.js', type: 'text/javascript' },
    ],
  },

  bundles: {
    client: {
      // Src entry file.
      srcEntryFile: './src/client/index.js',

      // Src paths.
      srcPaths: [
        './src/client',
        './src/shared',
        './config',
      ],

      // Where does the client bundle output live?
      outputPath: './boldr/boldrCMS/client',

      // What is the public http path at which we must serve the bundle from?
      webPath: '/client/',
      devVendorDLL: {
        enabled: true,
        exclude: [
          'colors',
          'compression',
          'express',
          'app-root-dir',
        ],
        include: ['core-js'],
        name: '__dev_vendor_dll__',
      },
    },

    server: {
      // Src entry file.
      srcEntryFile: './src/server/index.js',

      // Src paths.
      srcPaths: [
        './src/server',
        './src/shared',
        './config',
      ],

      // Where does the server bundle output live?
      outputPath: './boldr/boldrCMS/server',
    },
  },

  additionalNodeBundles: {},

  // These plugin definitions provide you with advanced hooks into customising
  // the project without having to reach into the internals of the tools.
  //
  // We have decided to create this plugin approach so that you can come to
  // a centralised configuration folder to do most of your application
  // configuration adjustments.  Additionally it helps to make merging
  // from the origin starter kit a bit easier.
  plugins: {
    // This is used to resolve the babel configuration used to transpile the
    // source bundles for development/production modes.
    //
    // Please use the provided values and then ensure that you return the
    // appropriate values for the given target and mode.
    babelConfig: (buildOptions: BuildOptions) => {
      const { target, mode } = buildOptions;

      return {
        // We need to ensure that we do this otherwise the babelrc will
        // get interpretted and for the current configuration this will mean
        // that it will kill our webpack treeshaking feature as the modules
        // transpilation has not been disabled within in.
        babelrc: false,

        presets: [
          // JSX
          'react',
          ['boldr', { es2015: { modules: false } }],

          target === 'server'
            ? ['env', { targets: { node: true }, modules: false }]
            : null,
        ].filter(x => x != null),

        plugins: [
          // Required to support react hot loader.
          mode === 'development'
            ? 'react-hot-loader/babel'
            : null,
        ].filter(x => x != null),
      };
    },


    webpackConfig: (webpackConfig: Object, buildOptions: BuildOptions) => {
      const { target, mode } = buildOptions; // eslint-disable-line no-unused-vars

      // Example:
      /*
      if (target === 'server' && mode === 'development') {
        webpackConfig.plugins.push(new MyCoolWebpackPlugin());
      }
      */

      // Debugging/Logging Example:
      /*
      if (target === 'server') {
        console.log(JSON.stringify(webpackConfig, null, 4));
      }
      */

      return webpackConfig;
    },
  },
};

// Create the filtered client configuration object.
export const clientConfig = filterObject(config, clientConfigFilter);

// Export the main config as the default export.
export default config;
