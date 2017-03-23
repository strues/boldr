require('dotenv').config();

/**
 * The Boldr configuration. Modify values here and we'll do the rest.
 * @type {Object}
 */
const vendor = [
  'react',
  'react-dom',
  'react-router-dom',
  'redux',
  'react-redux',
  'redux-thunk',
  'draft-js',
  'react-md',
  'react-addons-css-transition-group',
  'react-addons-transition-group',
  'draft-js-wysiwyg',
  'redux-form',
  'normalizr',
  'reselect',
  'humps',
  'react-dropzone',
];
module.exports = {
  serveAssetsFrom: '/assets/',
  serverPort: process.env.SERVER_PORT || 3000,
  serverHost: process.env.SERVER_HOST || 'localhost',
  serverUrl: 'http://localhost:3000',
  apiPrefix: process.env.API_PREFIX || '/api/v1',
  apiHost: process.env.API_HOST || 'localhost',
  apiPort: process.env.API_PORT || 2121,
  hmrPort: process.env.HMR_PORT || 3001,
  isVerbose: true,
  isDebug: true,
  vendorFiles: vendor,
};
