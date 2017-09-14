import path from 'path';
import fs from 'fs-extra';
import logger from '@boldr/utils/lib/logger';
import appRoot from '@boldr/utils/lib/node/appRoot';

function cleanAll(rootDir) {
  Promise.all([
    fs.removeSync(`${rootDir}/node_modules/.cache/`),
    fs.removeSync('build/server'),
    fs.removeSync('build/client'),
  ]).catch(err => logger.error(err));
}

function task(args, options) {
  logger.task('Cleaning up');

  const rootDir = appRoot.get();
  const { type } = args;
  switch (type) {
    case 'all':
      cleanAll(rootDir);
      logger.end('Removed cache, built client files, and compiled server.');
      break;
    case 'server':
      fs.removeSync('build/server');
      logger.end('Removed compiled server.');
      break;
    case 'client':
      fs.removeSync('build/client');
      logger.end('Removed compiled client.');
      break;
    case 'cache':
      fs.removeSync(`${rootDir}/node_modules/.cache/`);
      logger.end('Removed cache.');
      break;

    default:
      cleanAll(rootDir);
  }
}

function register(program) {
  program
    .command('clean', 'Remove directories.')
    .help('Specify a type to clean.')
    .argument('<type>', 'Directories to clean', ['client', 'server', 'cache', 'all'])
    .action(task);
}

export default { register };
