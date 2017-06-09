const getClientEnvironment = require('./env');

const envDefaults = getClientEnvironment();

module.exports = {
  env: {
    NODE_ENV: envDefaults.raw.NODE_ENV,
    BOLDR_SERVER_PORT: parseInt(envDefaults.raw.BOLDR_SERVER_PORT, 10),
    BOLDR_DEV_PORT: parseInt(envDefaults.raw.BOLDR_DEV_PORT, 10),
  },
  plugins: [require('../plugins/watchConfig'), require('../plugins/webpackPlugin')],
  bundle: {
    cssModules: true,
    wpProfile: false,
    webPath: '/assets/',
    babelrc: null,
  },
};
