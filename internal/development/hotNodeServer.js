import path from 'path';
import { spawn } from 'child_process';
import appRootDir from 'app-root-dir';
import logger from 'boldr-utils/es/logger';

const debug = require('debug')('boldr:webpack');

class HotNodeServer {
  constructor(name, compiler, clientCompiler) {
    const compiledEntryFile = path.resolve(
      appRootDir.get(),
      compiler.options.output.path,
      `${Object.keys(compiler.options.entry)[0]}.js`,
    );

    const startServer = () => {
      if (this.server) {
        this.server.kill();
        this.server = null;
        logger.info('Restarting server...');
      }

      const newServer = spawn('node', [compiledEntryFile]);

      logger.end('Server running with latest changes.');

      newServer.stdout.on('data', data => debug(data.toString().trim()));
      newServer.stderr.on('data', data => {
        logger.error('Error in server exec, check the console for more info.');
        debug(data.toString().trim());
      });
      this.server = newServer;
    };

    const waitForClientThenStartServer = () => {
      if (this.serverCompiling) {
        return;
      }
      if (this.clientCompiling) {
        setTimeout(waitForClientThenStartServer, 50);
      } else {
        startServer();
      }
    };

    clientCompiler.plugin('compile', () => {
      this.clientCompiling = true;
    });

    clientCompiler.plugin('done', stats => {
      if (!stats.hasErrors()) {
        this.clientCompiling = false;
      }
    });

    compiler.plugin('compile', () => {
      this.serverCompiling = true;
      logger.task('Building new bundle...');
    });

    compiler.plugin('done', stats => {
      this.serverCompiling = false;

      if (this.disposing) {
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
        logger.error('Failed to start, check the console for more information.'); // eslint-disable-line
        debug(err);
      }
    });

    // Lets start the compiler.
    this.watcher = compiler.watch(null, () => undefined);
  }

  dispose() {
    this.disposing = true;

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

export default HotNodeServer;
