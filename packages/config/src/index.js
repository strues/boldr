import path from 'path';
import fs from 'fs-extra';
import appRoot from '@boldr/utils/lib/node/appRoot';
import loadConfig from './lib/loadConfig';

const configFileName = 'config.js';
const ROOT_DIR = appRoot.get();

function freeze(config) {
  return Object.freeze(
    Object.keys(config).reduce((result, key) => {
      const descriptor = { enumerable: true };
      if (typeof config[key] === 'function') {
        descriptor.get = config[key];
      } else {
        descriptor.value = config[key];
      }
      return Object.defineProperty(result, key, descriptor);
    }, {}),
  );
}

export default function getConfig() {
  const configPath = path.resolve(ROOT_DIR, `.boldr/${configFileName}`);
  fs.ensureFileSync(configPath);
  const config = loadConfig(configPath);

  return freeze(config);
}
