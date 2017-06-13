import replace from 'rollup-plugin-replace';
import babili from 'rollup-plugin-babili';

// Import the development configuration.
import config from './rollup.dev';

config.plugins[3] = replace({ 'process.env.NODE_ENV': JSON.stringify('production') });
config.plugins.push(babili());

export default config;
