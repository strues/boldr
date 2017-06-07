import path from 'path';
import defaultConfig from './default';

export default userConfig => {
  const config = Object.assign(defaultConfig, userConfig);

  // Set all paths
  config.boundPath.src = config.boundPath.base.bind(null, config.srcDir);

  config.boundPath.public = config.boundPath.base.bind(null, config.publicDir);
  config.boundPath.boldr = config.boundPath.base.bind(null, config.boldrDir);
  config.boundPath.compiled = config.boundPath.base.bind(null, config.compiledDir);
  config.boundPath.static = config.boundPath.base.bind(null, config.staticDir);

  // if (!userConfig.hasOwn || !userConfig.hasOwn.server) {
  //   const rootBase = (...args) =>
  //     Reflect.apply(path.resolve, null, [path.resolve(__dirname, '../framework'), ...args]);

  //   config.boundPath.clientDir = rootBase.bind(null, 'client');
  //   config.boundPath.serverDir = rootBase.bind(null, 'server');
  // } else {
  //   config.boundPath.clientDir = userConfig.boundPath.src;
  // }
  const rootBase = (...args) =>
    Reflect.apply(path.resolve, null, [path.resolve(__dirname, '../framework'), ...args]);

  config.boundPath.clientDir = rootBase.bind(null, 'client');
  config.boundPath.serverDir = rootBase.bind(null, 'server');

  return config;
};
