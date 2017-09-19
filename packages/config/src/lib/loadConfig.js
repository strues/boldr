import path from 'path';
import fs from 'fs-extra';
import merge from 'lodash.merge';

import defaultConfig from './defaultConfig';

const requireFn =
  // eslint-disable-next-line camelcase
  typeof __non_webpack_require__ !== 'undefined'
    ? // eslint-disable-next-line no-undef, camelcase
      __non_webpack_require__
    : require;

export default function loadConfig(configFile) {
  const boldrConfigFile = configFile;
  const fileCache = new Map();

  if (fileCache.has(boldrConfigFile)) {
    return fileCache.get(boldrConfigFile);
  }

  // then require the fresh config
  if (!fs.existsSync(boldrConfigFile)) {
    throw new Error(`Unable to read ${boldrConfigFile}`);
  }
  const userConfig = requireFn(boldrConfigFile); // eslint-disable-line global-require
  fileCache.set(boldrConfigFile, userConfig);
  return merge(defaultConfig, userConfig);
}
