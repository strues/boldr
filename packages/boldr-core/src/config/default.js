import path from 'path';
import _debug from 'debug';
import ip from 'ip';
import clientConfig from './default.client';

const localip = ip.address();
const debug = _debug('boldr:core:config');

const config = {
  hasOwn: {
    server: false,
    nginx: false,
  },

  env: process.env.NODE_ENV || 'development',

  basePath: path.resolve(__dirname, '..'),
  boldrDir: '.boldr',
  compiledDir: 'compiled',
  srcDir: 'src',
  distDir: 'dist',
  publicDir: 'public',
  staticDir: 'compiled/static',
  serverDir: 'server',
  testDir: 'tests',

  clientEntry: 'client.js',
  serverEntry: 'server.js',

  serverHost: process.env.HOST || localip,
  serverPort: process.env.PORT || 3000,

  universal: {
    output: 'server.js',
    clientStats: 'clientStats.json',
  },

  useCompiledServer: false,

  compilerCssInline: true,
  compilerDevtool: 'source-map',
  compilerHashType: 'hash',
  compilerFailOnWarning: false,
  compilerQuiet: false,
  compilerPublicPath: '/',
  compilerStats: {
    chunks: false,
    chunkModules: false,
    colors: true,
  },
  compilerVendor: [
    'react',
    'react-dom',
    'redux',
    'react-redux',
    'react-router-dom',
    'react-router-redux',
    'react-apollo',
    'material-ui',
    'styled-components',
  ],

  coverageReporters: [{ type: 'text-summary' }, { type: 'lcov', dir: 'coverage' }],

  serverMiddlewares: [],

  ...clientConfig,
};

export default config;
