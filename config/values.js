import * as EnvVars from './EnvVars';

const values = {
  clientConfigFilter: {
    serviceWorker: {
      enabled: true,
    },
    apiUrl: true,
    polyfillIO: true,
    htmlPage: true,
    token: {
      key: true,
    },
    host: true,
    port: true,
    apiPrefix: true,
  },

  // The host on which the server should run.
  host: EnvVars.string('HOST', 'localhost'),
  // The port on which the server should run.
  port: EnvVars.number('PORT', 3000),
  // The port on which the client bundle development server should run.
  hmrPort: EnvVars.number('HMR_PORT', 3001),
  apiPrefix: '/api/v1',
  apiUrl: 'http://localhost:2121',
  postgres: {
    name: 'boldr',
    host: EnvVars.string('POSTGRES_HOST', 'localhost'),
    user: EnvVars.string('POSTGRES_USER', 'postgres'),
    password: EnvVars.string('POSTGRES_PASSWORD', 'password'),
    uri: EnvVars.string('POSTGRES_CONN_URI', 'postgres://postgres:password@localhost:5432/boldr'),
    pool: {
      min: 2,
      max: 10,
    },
  },
  redis: {
    uri: EnvVars.string('REDIS_CONN_URI', 'redis://127.0.0.1:6379/1'),
  },
  saltRounds: 10,
  token: {
    key: 'jwt',
    secret: EnvVars.string('TOKEN_SECRET', 'b0ldrs0s3cr3t'),
    expiration: 60 * 60 * 24, // 1 day
  },
  mail: {
    host: EnvVars.string('MAIL_HOST', ''),
    user: EnvVars.string('MAIL_USER', 'admin@boldr.io'),
    password: EnvVars.string('MAIL_PASSWORD', ''),
    port: 465,
    ssl: true,
    domain: 'boldr.io',
    from: 'boldr@boldr.io',
  },
  logger: {
    console: true,
    file: false,
  },
  body: {
    limit: '20mb',
  },
  disableSSR: false,
  cacheMaxAge: '365d',
  polyfillIO: {
    enabled: true,
    url: 'https://cdn.polyfill.io/v2/polyfill.min.js?features=default,Symbol',
  },
  // Configuration for the HTML pages (headers/titles/scripts/css/etc).
  // We make use of react-helmet to consume the values below.
  // @see https://github.com/nfl/react-helmet
  htmlPage: {
    titleTemplate: '%s - Powered by Boldr',
    defaultTitle: 'Boldr',
    description: "Your dreams are bold. Your thoughts are bold. So why shouldn't your CMS be a little Boldr?",
  },
  // Path to the public assets that will be served off the root of the HTTP server.
  publicAssetsPath: './public',

  /**
   * 🚷  MODIFICATION BELOW NOT RECOMMENDED ❗
   * unless you're very familiar with the innerworkings of Webpack.
   */
  buildOutputPath: './boldrCMS',
  optimizeProdBuild: true,
  incSourceMaps: false,
  bundleSrcTypes: ['js', 'jsx', 'json'],
  bundleAssetTypes: ['jpg', 'jpeg', 'png', 'gif', 'ico', 'eot', 'svg', 'ttf', 'woff', 'woff2', 'otf'],
  bundleAssetsFileName: 'assets.json',
  extWhitelist: [
    /\.(eot|woff|woff2|ttf|otf)$/,
    /\.(svg|png|jpg|jpeg|gif|ico)$/,
    /\.(mp4|mp3|ogg|swf|webp)$/,
    /\.(css|scss|sass|sss|less)$/,
  ],
  serviceWorker: {
    enabled: true,
    fileName: 'sw.js',
    includePublicAssets: [
      './**/*',
    ],
    offlinePageTemplate: './internal/webpack/offlinePageTemplate.js',
    offlinePageFileName: 'offline.html',
  },

  bundles: {
    client: {
      // Src entry file.
      entryFile: './src/client/index.js',
      // Src paths.
      // @NOTE Mainly for the SW
      srcPaths: ['./src/client', './src/shared', './config'],
      // Where does the client bundle output live?
      outputPath: './boldrCMS/client',
      // What is the public http path at which we must serve the bundle from?
      webPath: '/assets/',
      devDlls: {
        enabled: true,
        include: [
          'react',
          'react-dom',
          'react-helmet',
          'react-router',
          'react-router-dom',
          'react-router-redux',
          'react-router-config',
          'redux',
          'react-redux',
          'axios',
          'redux-thunk',
          'react-md',
          'draft-js',
          'draftjs-to-html',
          'draft-js-import-html',
          'react-dropzone',
          'normalizr',
          'react-addons-css-transition-group',
          'react-addons-transition-group',
          'redux-form',
          'reselect',
          'serialize-javascript',
          'styled-components',
          'webfontloader',
          'react-draft-wysiwyg',
        ],
        name: '__dev_vendor_dll__',
      },
    },
    server: {
      entryFile: './src/server/index.js',
      // Src paths.
      srcPaths: ['./src/server', './src/shared', './config'],
      outputPath: './boldrCMS/server',
    },
  },

  additionalNodeBundles: {},
  plugins: {
    babelConfig: (babelConfig, buildOptions) => {
      // eslint-disable-next-line no-unused-vars
      const { target, mode } = buildOptions;
      return babelConfig;
    },
    webpackConfig: (webpackConfig, buildOptions) => {
      // eslint-disable-next-line no-unused-vars
      const { target, mode } = buildOptions;
      return webpackConfig;
    },
  },
};
if (process.env.BUILD_FLAG_IS_CLIENT) {
  throw new Error(
    'Avoid including the values file itself. This will bundle your secrets with your app.',
  );
}

export default values;
