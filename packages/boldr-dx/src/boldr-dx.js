#!/usr/bin/env node
/* @flow */
/* eslint-disable flowtype/no-types-missing-file-annotation */
import program from 'caporal';
import updateNotifier from 'update-notifier';
import logger from 'boldr-utils/lib/logger';
import _debug from 'debug';
import pkg from '../package.json';
import dev from './commands/dev';
import clean from './commands/clean';
import build from './commands/build';
import createUser from './commands/createUser';

import Engine from './engine';
import { cwd } from './config/paths';

const debug = _debug('boldr:dx:dx');
// @TODO: Remove this once babel-loader updates
// https://github.com/babel/babel-loader/pull/391
// $FlowIssue
process.noDeprecation = true;

updateNotifier({ pkg }).notify();

program.STRING = value => (typeof value === 'string' ? value : null);
program.version(pkg.version).description('Boldr developer tools.');

build.register(program);
clean.register(program);
dev.register(program);
createUser.register(program);

program.parse(process.argv);
