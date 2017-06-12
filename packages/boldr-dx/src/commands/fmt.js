const path = require('path');
const spawn = require('child_process').spawnSync;
const chalk = require('chalk');
const glob = require('glob');
import logger from 'boldr-utils/lib/logger';

const PATHS = require('../config/paths');

function runCommand(cmd, args, cwd) {
  if (!cwd) {
    cwd = __dirname;
  }

  const displayArgs = args.length > 25 ? args.slice(0, 25) + '...' : args.join(' ');
  console.log(chalk.dim('$ cd ' + cwd + `\n$ ${cmd} ${displayArgs}\n`));
  const result = spawn(cmd, args, {
    cwd,
    stdio: 'inherit',
  });
  if (result.error || result.status !== 0) {
    const message = 'Error running command.';
    const error = new Error(message);
    error.stack = message;
    throw error;
  }
}

function worker(config) {
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
      .concat(`--${shouldWrite ? 'write' : 'l'}`, files);

    try {
      runCommand(prettierCmd, args, path.resolve(__dirname, '..'));
    } catch (e) {
      console.log(e);
      if (!shouldWrite) {
        console.log(
          chalk.red(`  This project uses prettier to format all JavaScript code.\n`) +
            chalk.dim(`    Please run `) +
            chalk.reset('yarn prettier') +
            chalk.dim(` and add changes to files listed above to your commit.`) +
            `\n`,
        );
      }
    }
  });
}
function task(args, options) {
  const defaultOptions = {
    'bracket-spacing': 'true',
    'print-width': 80,
    'single-quote': 'true',
    'trailing-comma': 'all',
    'jsx-bracket-same-line': 'false',
  };
  const config = {
    default: {
      ignore: ['**/node_modules/**', 'packages/*/.boldr/'],
      patterns: ['packages/*/src/**/', 'packages/*/internal/**/', 'internal/'],
    },
  };
  const shouldWrite = process.argv[2] === 'write';
  const isWindows = process.platform === 'win32';
  const prettier = isWindows ? 'prettier.cmd' : 'prettier';
  const prettierCmd = path.resolve(__dirname, `../node_modules/.bin/${prettier}`);
  logger.info('Loading configuration.');

  const inputOptions = options;
}

module.exports = function register(program) {
  program
    .command('fmt', 'Format your project with Prettier.')
    .option('-p, --port <num>', 'Dev server port', program.INT, 1)
    .action(task);
};
