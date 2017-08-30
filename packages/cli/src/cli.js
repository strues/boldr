import program from 'caporal';
import updateNotifier from 'update-notifier';
import {
  cleanClient,
  cleanServer,
  startRenderServer,
  buildClient,
  buildServer,
  startDevServer,
} from '@boldr/tools';

import pkg from '../package.json';
import { createLogger, printHeader } from './util/logger';

updateNotifier({ pkg }).notify();

const VERSION = pkg.version;
program.STRING = value => (typeof value === 'string' ? value : null);

program
  // default command
  .version(VERSION)
  .logger(createLogger())
  .description('A command line scaffolding tool and helper for Boldr.');

program
  .command('develop', 'Start development server')
  .alias('dev')
  .action((args, options, logger) => {
    try {
      printHeader(logger);
      startDevServer();
    } catch (error) {
      console.log(error);
      process.exit(1);
    }
  });
program.command('clean', 'Clean compiled files').action(async (args, options, logger) => {
  try {
    printHeader(logger);
    await cleanClient();
    await cleanServer();
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
});
program
  .command('build', 'Build the client and server bundles for production')
  .action((args, options, logger) => {
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
      printHeader(logger);
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
