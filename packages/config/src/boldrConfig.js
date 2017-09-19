/* eslint-disable object-shorthand */
import path from 'path';
import fs from 'fs-extra';
import { get as getAppRoot } from 'app-root-dir';
import _debug from 'debug';
import merge from 'lodash.merge';

import defaultConfig from './lib/defaultConfig';

const debug = _debug('boldr:config');

const requireFn =
  // eslint-disable-next-line camelcase
  typeof __non_webpack_require__ !== 'undefined'
    ? // eslint-disable-next-line no-undef, camelcase
      __non_webpack_require__
    : require;

/**
 * Path of the current working directory, with symlinks taken
 * into account.
 * @type {String}
 */
const ROOT = getAppRoot();

const CONFIG_DIR_NAME = '.boldr';

/**
 * Get the path from the user's project root
 * @param  {String} args the path we are trying to reach
 * @return {any}      whatever it is we're looking for
 */
function resolveFromRoot(...args) {
  return path.resolve(ROOT, ...args);
}

const boldrConfigDir = resolveFromRoot(CONFIG_DIR_NAME);

function loadConfig(cfgFile) {
  const boldrConfigFile = cfgFile;

  // then require the fresh config
  if (!fs.existsSync(boldrConfigFile)) {
    throw new Error(`Unable to read ${boldrConfigFile}`);
  }
  const userConfig = requireFn(boldrConfigFile); // eslint-disable-line global-require
  return userConfig;
}

function boldrConfig() {
  const fileCache = new Map();
  const cfgFile = path.resolve(boldrConfigDir, './config.js');
  debug(`Config file path: ${cfgFile}`);

  if (!fs.existsSync(cfgFile)) {
    throw new Error(`No config file found at ${cfgFile}`);
  }

  if (fileCache.has(cfgFile)) {
    debug('Getting file from cache');
    return fileCache.get(cfgFile);
  }
  const usrConfig = loadConfig(cfgFile);
  const config = merge(defaultConfig, usrConfig);
  fileCache.set(cfgFile, config);
  debug(fileCache);

  return config;
}

export default boldrConfig;
