import merge from 'lodash.merge';
import defaultConfig from './defaultConfig';

export default function loadConfig(configPath) {
  const configModulePath = configPath;
  // first clean up require cache so we always load fresh config
  delete require.cache[configModulePath];
  // then require the fresh config
  const config = require(configModulePath); // eslint-disable-line global-require
  return merge(defaultConfig, config);
}
