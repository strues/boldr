/* @flow */
const path = require('path');
const appRoot = require('boldr-utils/lib/node/appRoot');
const debug = require('debug')('boldr:dx:config:loadConfig');

const defaultConfig = require('./defaultConfig');

module.exports = function loadConfig(engine): Config {
  const configModulePath = engine.getConfigPath();
  // first clean up require cache so we always load fresh config
  delete require.cache[configModulePath];
  // then require the fresh config
  const config = require(configModulePath); // eslint-disable-line global-require
  return {
    env: {
      ...defaultConfig.env,
      ...(config.env || {}),
    },
    plugins: [...defaultConfig.plugins, ...(config.plugins || [])],
    bundle: {
      ...defaultConfig.bundle,
      ...config.bundle,
    },
  };
};
