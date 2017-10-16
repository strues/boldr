import program from 'caporal';
import updateNotifier from 'update-notifier';
import {
  cleanClient,
  cleanServer,
  startRenderServer,
  buildClient,
  buildServer,
} from '@boldr/tools';

import pkg from '../package.json';
import clean from './commands/clean';
import init from './commands/init';
import dev from './commands/dev';
import migrate from './commands/migrate';
import migration from './commands/migration';

updateNotifier({ pkg }).notify();

const VERSION = pkg.version;
program.STRING = value => (typeof value === 'string' ? value : null);

program
  // default command
  .version(VERSION)
  .description('Command line tools for interacting with Boldr.');

dev.register(program);
clean.register(program);
init.register(program);
migration.register(program);
migrate.register(program);
program
  .command('build', 'Build the client and server bundles for production')
  .action((args, options) => {
    async function clean() {
      await cleanClient();
      await cleanServer();
    }
    async function build() {
      await clean();
      await buildClient();
      await buildServer();
    }
    try {
      build();
    } catch (error) {
      console.log(error);
      process.exit(1);
    }
  });
program.command('start:ssr', 'Start the application rendernig on the server.').action(() => {
  try {
    startRenderServer();
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
});

program.parse(process.argv);
