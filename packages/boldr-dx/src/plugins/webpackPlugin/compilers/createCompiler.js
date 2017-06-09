/* @flow */
import webpack from 'webpack';
import logger from 'boldr-utils/lib/logger';

export default function createCompiler(config: WebpackCompiler) {
  let compiler;
  try {
    compiler = webpack(config);
  } catch (e) {
    logger.error('Failed to compile.', e);
    process.exit(1);
  }
  return compiler;
}
