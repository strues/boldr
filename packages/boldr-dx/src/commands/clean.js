import path from 'path';
import fs from 'fs-extra';
import logger from 'boldr-utils/lib/logger';
import Engine from '../engine';

function clean(config) {
  const rootDir = process.cwd();
  fs.removeSync(`${rootDir}/node_modules/.boldr_cache/`);
  fs.removeSync(config.bundle.assetsDir);
  fs.removeSync(config.bundle.server.bundleDir);
}

function cleanInput(directory) {
  const rootDir = process.cwd();
  fs.removeSync(`${rootDir}/${directory}`);
}

function task(args, options) {
  logger.task('Cleaning up');
  const engine = new Engine(fs.realpathSync(process.cwd()), undefined);
  const config = engine.getConfiguration();
  clean(config);

  const { directory } = options;
  if (directory) {
    cleanInput(directory);
  }
  logger.end('Removed cache, built client files, and compiled server.');
}

function register(program) {
  program
    .command('clean', 'Remove files or directories.')
    .help('By default, cache, assets dir and the compiled server are removed.')
    .option(
      '-d, --directory [dir]',
      'Path from current working directory to the directory or file to remove.',
    )
    .action(task);
}

export default { register };
