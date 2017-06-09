import express from 'express';
import devMiddleware from 'webpack-dev-middleware';
import hotMiddleware from 'webpack-hot-middleware';
import _debug from 'debug';
import logger from 'boldr-utils/lib/logger';
import ServerListener from './serverListener';

const debug = _debug('boldr:dx:services:devClient');

class DevClient {
  constructor(compiler, config) {
    this.config = config;

    const app = express();

    const httpPathRegex = /^https?:\/\/(.*):([\d]{1,5})/i;
    const httpPath = compiler.options.output.publicPath;

    if (!httpPath.startsWith('http') && !httpPathRegex.test(httpPath)) {
      throw new Error('Development server requires an absolute public path.');
    }

    // eslint-disable-next-line no-unused-vars
    const [_, host, port] = httpPathRegex.exec(httpPath);

    this.webpackDevMiddleware = devMiddleware(compiler, {
      quiet: true,
      noInfo: true,
      lazy: false,
      hot: true,
      watchOptions: {
        ignored: /node_modules/,
      },
      headers: {
        'Access-Control-Allow-Origin': '*',
      },
      publicPath: compiler.options.output.publicPath,
    });

    app.use(this.webpackDevMiddleware);
    app.use(hotMiddleware(compiler));

    const devPort = parseInt(config.env.BOLDR_DEV_PORT, 10);
    const listener = app.listen(devPort, host);

    this.serverListener = new ServerListener(listener, 'client');

    compiler.plugin('done', stats => {
      if (!stats.hasErrors()) {
        return logger.end('Running with latest changes.');
      }
      logger.error('Build failed', stats.toString());
    });
  }

  shutdown() {
    this.webpackDevMiddleware.close();

    return this.serverListener ? this.serverListener.shutdown() : Promise.resolve();
  }
}

export default DevClient;
