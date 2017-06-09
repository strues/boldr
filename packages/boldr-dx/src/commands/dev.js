import appRoot from 'boldr-utils/lib/node/appRoot';
import logger from 'boldr-utils/lib/logger';
import Engine from '../engine';

function task(args, options) {
  logger.info('Loading configuration.');
  const cwd = appRoot.get();
  const engine = new Engine(cwd);
  engine.dev().catch(e => {
    logger.error(e);
    process.exit(1);
  });
  process.on('SIGINT', () => {
    engine.stop();
  });
}

function register(program) {
  program
    .command('dev', 'Launch the development process.')
    .option('-p, --port <num>', 'Dev server port', program.INT, 1)
    .action(task);
}

export default { register };
