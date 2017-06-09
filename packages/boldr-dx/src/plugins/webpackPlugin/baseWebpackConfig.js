import appRoot from 'boldr-utils/lib/node/appRoot';
// import webpack from 'webpack';
import chalk from 'chalk';
// import ProgressBarPlugin from 'progress-bar-webpack-plugin';
// import NpmInstallPlugin from 'npm-install-webpack-plugin';
import PATHS from '../../config/paths';
import { envDev, envProd, envDebug } from './util/helpers';

export const DEFAULT_CONTEXT = appRoot.get();

export default {
  context: DEFAULT_CONTEXT,
  entry: {},
  output: {},
  resolve: {
    modules: ['node_modules', PATHS.projectNodeModules].concat(PATHS.nodePaths),
    extensions: ['.js', '.jsx', '.json'],
  },
  resolveLoader: {
    modules: [PATHS.boldrNodeModules, PATHS.projectNodeModules],
  },
  stats: {},
  node: {},
  bail: envProd,
  cache: envDev,
  performance: {},
  externals: [],
  module: {
    noParse: [/\.min\.js/],
  },
};
