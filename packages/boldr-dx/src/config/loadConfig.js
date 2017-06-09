/* @flow */
const path = require('path');
const appRoot = require('boldr-utils/lib/node/appRoot');
const debug = require('debug')('boldr:dx:config:loadConfig');

const defaultConfig = require('./defaultConfig');

module.exports = function loadConfig(engine): Config {
  try {
    const configModulePath = engine.getConfigPath();
    const inputOpts = engine.getInputOptions();
    // first clean up require cache so we always load fresh config
    delete require.cache[configModulePath];
    // then require the fresh config
    const config = require(configModulePath); // eslint-disable-line global-require

    debug('Loaded fresh config values');

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
  } catch (e) {
    return defaultConfig;
  }
};
