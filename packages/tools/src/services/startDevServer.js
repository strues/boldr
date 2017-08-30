import logger from '@boldr/utils/lib/logger';
import formatWebpackMessages from 'react-dev-utils/formatWebpackMessages';
import createExpress from '../server/createExpress';
import devMiddleware from '../server/devMiddleware';
import buildWebpackDlls from './buildWebpackDlls';

const DEV_PORT = process.env.DEV_PORT;
const PORT = parseInt(DEV_PORT, 10);

export async function startDevServer() {
  await buildWebpackDlls();
  logger.start('Creating development server...');
  const server = createExpress({});

  const multiCompiler = devMiddleware(server);

  let serverIsStarted = false;
  multiCompiler.plugin('invalid', () => {
    logger.task('Compiling...');
  });

  multiCompiler.plugin('done', stats => {
    const rawMessages = stats.toJson({}, true);
    const messages = formatWebpackMessages(rawMessages);

    if (!messages.errors.length && !messages.warnings.length) {
      logger.end('Compiled successfully!');
    }

    // If errors exist, only show errors.
    if (messages.errors.length) {
      logger.error('Failed to compile.\n');
      messages.errors.forEach(e => logger.error(e));
      return;
    }

    // Show warnings if no errors were found.
    if (messages.warnings.length) {
      logger.warn('Compiled with warnings.\n');
      messages.warnings.forEach(w => logger.warn(w));
    }

    if (!stats.hasErrors() && !serverIsStarted) {
      serverIsStarted = true;

      server.listen(PORT, () => {
        logger.end(`Dev rendering server running on port: ${PORT}`);
      });
    }
  });
}
