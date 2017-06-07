/* eslint-disable prefer-destructuring */
import path from 'path';
import _debug from 'debug';
import ip from 'ip';

const localip = ip.address();
const debug = _debug('boldr:config');
const NODE_ENV = process.env.NODE_ENV || 'development';

const config = {
  serverHost: process.env.SERVER_HOST || localip,
  serverPort: process.env.SERVER_PORT || 3000,
  compilerVendor: [
    'react',
    'react-dom',
    'react-router-dom',
    'redux',
    'react-redux',
    'react-apollo',
    'react-router-redux',
    'material-ui',
    'react-tap-event-plugin',
    'graphql-tag',
  ],
};

const base = (...args) =>
  Reflect.apply(path.resolve, null, [path.resolve(__dirname, '../..'), ...args]);

config.boundPath = {
  base,
};

debug(`Checking for environment overrides for NODE_ENV "${NODE_ENV}".`);

const environments = require('./environments').default;

const overrides = environments[NODE_ENV];

if (overrides) {
  debug('Merging overrides with defaults.');
  Object.assign(config, overrides(config));
}

export default config;
