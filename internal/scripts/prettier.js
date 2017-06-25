/* eslint-disable */

const chalk = require('chalk');
const glob = require('glob');
const path = require('path');
const execFileSync = require('child_process').execFileSync;

const shouldWrite = process.argv[2] === 'write';
const isWindows = process.platform === 'win32';
const prettier = isWindows ? 'prettier.cmd' : 'prettier';

const prettierCmd = path.resolve(
  __dirname,
  // prettier-ignore
  `../../node_modules/.bin/${prettier}`
);
const defaultOptions = {
  'single-quote': true,

  'trailing-comma': 'all',
  'print-width': 100,
  'jsx-bracket-same-line': false,
};
const config = {
  default: {
    patterns: ['src/**/*.js', '__tests__/**/*.js', '__mocks__/**/*.js'],
    ignore: ['**/node_modules/**'],
  },
};

function exec(command, args) {
  console.log(`> ${[command].concat(args).join(' ')}`);
  const options = {};
  return execFileSync(command, args, options).toString();
}

Object.keys(config).forEach(key => {
  const patterns = config[key].patterns;
  const options = config[key].options;
  const ignore = config[key].ignore;

  const globPattern = patterns.length > 1
    ? `{${patterns.join(',')}}`
    : `${patterns.join(',')}`;
  const files = glob.sync(globPattern, { ignore });

  const args = Object.keys(defaultOptions).map(
    k => `--${k}=${(options && options[k]) || defaultOptions[k]}`
  );
  args.push(`--${shouldWrite ? 'write' : 'l'}`);

  try {
    exec(prettierCmd, [...args, ...files]);
  } catch (e) {
    throw e;
  }
});
