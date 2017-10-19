import { resolve } from 'path';
import appRoot from '@boldr/utils/lib/node/appRoot';
import logger from '@boldr/utils/lib/logger';
import { createBackend } from '@boldr/backend';
import config from '@boldr/config';
import errorOverlayMiddleware from 'react-dev-utils/errorOverlayMiddleware';
import formatWebpackMessages from 'react-dev-utils/formatWebpackMessages';
import webpack from 'webpack';
import webpackDevMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';
import webpackHotServerMiddleware from 'webpack-hot-server-middleware';

import createWebpackConfig from '../createWebpackConfig';

const DEV_PORT = process.env.DEV_PORT;
const PUBLIC_PATH = process.env.PUBLIC_PATH;
const PORT = parseInt(DEV_PORT, 10);

const ROOT = appRoot.get();
const CLIENT_OUTPUT = resolve(ROOT, config.get('tools.paths.output.client'));

const locale = {
  default: 'en-US',
  supported: ['en-US', 'es-ES'],
};

process.on('unhandledRejection', err => {
  throw err;
});

export function startDevServer() {
  const clientConfig = createWebpackConfig({
    target: 'client',
    env: 'development',
  });

  const serverConfig = createWebpackConfig({
    target: 'server',
    env: 'development',
  });
  const multiCompiler = webpack([clientConfig, serverConfig]);
  const clientCompiler = multiCompiler.compilers[0];
  const devMiddleware = webpackDevMiddleware(multiCompiler, {
    // required
    publicPath: PUBLIC_PATH,
    // display no info to console (only warnings and errors)
    noInfo: false,
    quiet: true,
    // prevent loading before bundle is done
    serverSideRender: true,
  });

  const hotMiddleware = webpackHotMiddleware(clientCompiler);

  // keeps serverRender updated with arg: { clientStats, outputPath }
  const hotServerMiddleware = webpackHotServerMiddleware(multiCompiler, {
    chunkName: 'ssr',
    serverRendererOptions: {
      outputPath: CLIENT_OUTPUT,
    },
  });

  const server = createBackend({
    staticConfig: {
      public: PUBLIC_PATH,
      path: CLIENT_OUTPUT,
    },
    localeConfig: locale,
    afterSecurity: [],
    preErrorHandler: [devMiddleware, hotMiddleware, hotServerMiddleware, errorOverlayMiddleware],
  });

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
