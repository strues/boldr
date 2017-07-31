#!/usr/bin/env node

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

updateNotifier({ pkg }).notify();

const VERSION = pkg.version;
program.STRING = value => (typeof value === 'string' ? value : null);

program
  // default command
  .version(VERSION)
  .description('A command line scaffolding tool and helper for Boldr.');

program.command('develop', 'Start development server').alias('dev').action(async () => {
  try {
    Promise.all([await cleanClient(), await cleanServer(), await startDevServer()]).catch(err =>
      console.log(err),
    );
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
});
program.command('clean', 'Clean compiled files').action(async () => {
  try {
    Promise.all([await cleanClient(), await cleanServer()]).catch(err => console.log(err));
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
});
program.command('build', 'Build the client and server bundles for production').action(async () => {
  try {
    Promise.all([
      await cleanClient(),
      await cleanServer(),
      await buildClient(),
      await buildServer(),
    ]).catch(err => console.log(err));
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
