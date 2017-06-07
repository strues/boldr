/**
 * @module boldr/framework/server/index
 */
import defaultConfig from '../../config';
import boldrServer from './server';

export default userConfig => {
  const config = defaultConfig(userConfig);

  return boldrServer(config);
};
