#!/usr/bin/env node

const execa = require('execa');
const chalk = require('chalk');

module.exports = function runCmd(cmd, args, cwd) {
  if (!cwd) {
    cwd = __dirname;
  }

  const displayArgs = args.length > 25 ? args.slice(0, 25) + '...' : args.join(' ');
  console.log(chalk.cyan('$ cd ' + cwd + `\n$ ${cmd} ${displayArgs}\n`));
  const result = execa(cmd, args, {
    cwd,
    stdio: 'inherit',
  });
  if (result.error || result.status !== 0) {
    const message = 'Error running command.';
    const error = new Error(message);
    error.stack = message;
    throw error;
  }
};
