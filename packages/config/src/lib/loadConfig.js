import path from 'path';
import merge from 'lodash.merge';
import defaultConfig from './defaultConfig';

const debug = require('debug')('boldr:config:loadConfig');

export default function loadConfig(configPath) {
  debug('Loading config file:', configPath);
  const configModulePath = configPath;
  // first clean up require cache so we always load fresh config
  delete require.cache[configModulePath];
  // then require the fresh config
  const config = require(configModulePath); // eslint-disable-line global-require
  return merge(defaultConfig, config);
}
