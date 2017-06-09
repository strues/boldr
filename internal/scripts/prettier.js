#!/usr/bin/env node

/* eslint-disable prefer-destructuring, prefer-template */
const path = require('path');
const chalk = require('chalk');
const glob = require('glob');
const runCmd = require('./run');

const shouldWrite = process.argv[2] === 'write';
const isWindows = process.platform === 'win32';
const prettier = isWindows ? 'prettier.cmd' : 'prettier';
const prettierCmd = path.resolve(__dirname, '../../node_modules/.bin/' + prettier);
const defaultOptions = {
  'bracket-spacing': 'true',
  'print-width': 100,
  'single-quote': 'true',
  'trailing-comma': 'all',
  'jsx-bracket-same-line': 'false',
  parser: 'flow',
};
const config = {
  default: {
    ignore: ['**/node_modules/**'],
    patterns: ['packages/*/src/**/', 'packages/*/internal/**/', 'api/**'],
  },
};

Object.keys(config).forEach(key => {
  const patterns = config[key].patterns;
  const options = config[key].options;
  const ignore = config[key].ignore;

  const globPattern = patterns.length > 1
    ? `{${patterns.join(',')}}*.js`
    : `${patterns.join(',')}*.js`;
  const files = glob.sync(globPattern, { ignore });

  const args = Object.keys(defaultOptions)
    .map(key => `--${key}=${(options && options[key]) || defaultOptions[key]}`)
    .concat('--write', files);

  try {
    console.log(chalk.cyan('Making code your code pretty again\n'));
    runCmd(prettierCmd, args, path.resolve(__dirname, '../..'));
  } catch (e) {
    console.log(e);
  }
});
