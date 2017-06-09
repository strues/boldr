/* eslint-disable require-await */
import path from 'path';
import { spawn } from 'child_process';
import logger from 'boldr-utils/lib/logger';
import appRoot from 'boldr-utils/lib/node/appRoot';
import _debug from 'debug';

const debug = _debug('boldr:dx:services:devServer');

class DevServer {
  constructor(serverCompiler, clientCompiler) {
    const compiledEntryFile = path.resolve(
      appRoot.get(),
      serverCompiler.options.output.path,
      'server.js',
    );

    const startServer = async () => {
      await this.prepareMiddlewares(serverCompiler);
      if (this.server) {
        this.server.kill();
        this.server = null;
        logger.info('Restarting server...');
      }

      const newServer = spawn('node', ['--inspect', compiledEntryFile, '--colors'], {
        stdio: [process.stdin, process.stdout, 'pipe'],
      });

      logger.end('Server running with latest changes.');

      newServer.stderr.on('data', data => {
        process.stderr.write('\n');
        process.stderr.write(data);
        process.stderr.write('\n');
      });
      this.server = newServer;
    };

    const waitForClientThenStartServer = () => {
      if (this.serverCompiling) {
        return;
      }
      if (this.clientCompiling) {
        setTimeout(waitForClientThenStartServer, 40);
      } else {
        startServer();
      }
    };

    clientCompiler.plugin('compile', () => {
      logger.info('Building a new client bundle...');
      this.clientCompiling = true;
    });

    clientCompiler.plugin('done', stats => {
      logger.task('Client bundle compiled.');
      if (!stats.hasErrors()) {
        this.clientCompiling = false;
      }
    });

    serverCompiler.plugin('compile', () => {
      this.serverCompiling = true;
      logger.info('Building a new server bundle...');
    });

    serverCompiler.plugin('done', stats => {
      this.serverCompiling = false;

      if (this.exiting) {
        return;
      }

      try {
        if (stats.hasErrors()) {
          logger.error('Build failed, check the console for more information.');
          debug(stats.toString());
          return;
        }

        waitForClientThenStartServer();
      } catch (err) {
        logger.error(`Startup failed. ${err}`);
        process.exit(1);
      }
    });

    this.watcher = serverCompiler.watch(null, () => {});
  }
  async prepareMiddlewares(serverCompiler) {
    serverCompiler.plugin('after-emit', (compilation, callback) => {
      const { assets } = compilation;
      if (this.prevAssets) {
        for (const f of Object.keys(assets)) {
          deleteCache(assets[f].existsAt);
        }
        for (const f of Object.keys(this.prevAssets)) {
          if (!assets[f]) {
            deleteCache(this.prevAssets[f].existsAt);
          }
        }
      }
      this.prevAssets = assets;

      callback();
    });
  }

  shutdown() {
    this.exiting = true;

    const stopWatcher = new Promise(resolve => {
      this.watcher.close(resolve);
    });

    return stopWatcher.then(() => {
      if (this.server) {
        this.server.kill();
      }
    });
  }
}

function deleteCache(path) {
  delete require.cache[path];
}

export default DevServer;
