/* eslint-disable */
const path = require('path');
const dotenv = require('dotenv');
dotenv.config();

module.exports = {
  env: {
    NODE_ENV: process.env.NODE_ENV,
    BOLDR__SERVER_PORT: process.env.BOLDR__SERVER_PORT,
    BOLDR__DEV_PORT: process.env.BOLDR__DEV_PORT,
    BOLDR__DEBUG: process.env.BOLDR__DEBUG,
  },
  // plugins: [require('boldr-plugin-webpack')],
  bundle: {
    verbose: true,
    debug: false,
    cssModules: true,
    wpProfile: false,
    webPath: '/assets/',
    publicDir: path.resolve(__dirname, '../public'),
    assetsDir:  path.resolve(__dirname, '../public/assets'),
    srcDir: path.resolve(__dirname, '../src'),
    client: {
      entry: path.resolve(__dirname, '../src/client/index.js'),
      bundleDir: path.resolve(__dirname, '../public/assets'),
    },
    server: {
      entry: path.resolve(__dirname, '../src/server/index.js'),
      bundleDir: path.resolve(__dirname, '../lib'),
    },
    vendor: [
      'apollo-client',
      'axios',
      'boldr-ui',
      'boldr-utils',
      'classnames',
      'draft-js-import-html',
      'draft-js',
      'draftjs-to-html',
      'griddle-react',
      'material-ui',
      'normalizr',
      'prop-types',
      'react-apollo',
      'react-dom',
      'react-draft-wysiwyg',
      'react-dropzone',
      'react-helmet',
      'react-redux',
      'react-router-dom',
      'react-router-redux',
      'react-tap-event-plugin',
      'react-transition-group',
      'react',
      'redux-form',
      'redux',
      'reselect',
      'serialize-javascript',
      'styled-components',
      'webfontloader',
    ],
  },
};
