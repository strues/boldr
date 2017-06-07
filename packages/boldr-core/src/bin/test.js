import config from '../config';
import createKarmaConfig from '../build/karma.conf';

const karmaConfig = createKarmaConfig(config);

module.exports = cfg => cfg.set(karmaConfig);
