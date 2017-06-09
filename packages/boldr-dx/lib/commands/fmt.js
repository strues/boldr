'use strict';

var _logger = require('boldr-utils/lib/logger');

var _logger2 = _interopRequireDefault(_logger);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _newArrowCheck(innerThis, boundThis) { if (innerThis !== boundThis) { throw new TypeError("Cannot instantiate an arrow function"); } }

var path = require('path');
var spawn = require('child_process').spawnSync;
var chalk = require('chalk');
var glob = require('glob');


var PATHS = require('../config/paths');

function runCommand(cmd, args, cwd) {
  if (!cwd) {
    cwd = __dirname;
  }

  var displayArgs = args.length > 25 ? args.slice(0, 25) + '...' : args.join(' ');
  console.log(chalk.dim('$ cd ' + cwd + ('\n$ ' + String(cmd) + ' ' + String(displayArgs) + '\n')));
  var result = spawn(cmd, args, {
    cwd: cwd,
    stdio: 'inherit'
  });
  if (result.error || result.status !== 0) {
    var message = 'Error running command.';
    var error = new Error(message);
    error.stack = message;
    throw error;
  }
}

function worker(config) {
  var _this = this;

  Object.keys(config).forEach(function (key) {
    _newArrowCheck(this, _this);

    var patterns = config[key].patterns;
    var options = config[key].options;
    var ignore = config[key].ignore;

    var globPattern = patterns.length > 1 ? '{' + String(patterns.join(',')) + '}*.js' : String(patterns.join(',')) + '*.js';
    var files = glob.sync(globPattern, { ignore: ignore });

    var args = Object.keys(defaultOptions).map(function (key) {
      _newArrowCheck(this, _this);

      return '--' + String(key) + '=' + String(options && options[key] || defaultOptions[key]);
    }.bind(this)).concat('--' + (shouldWrite ? 'write' : 'l'), files);

    try {
      runCommand(prettierCmd, args, path.resolve(__dirname, '..'));
    } catch (e) {
      console.log(e);
      if (!shouldWrite) {
        console.log(chalk.red('  This project uses prettier to format all JavaScript code.\n') + chalk.dim('    Please run ') + chalk.reset('yarn prettier') + chalk.dim(' and add changes to files listed above to your commit.') + '\n');
      }
    }
  }.bind(this));
}
function task(args, options) {
  var defaultOptions = {
    'bracket-spacing': 'true',
    'print-width': 80,
    'single-quote': 'true',
    'trailing-comma': 'all',
    'jsx-bracket-same-line': 'false'
  };
  var config = {
    default: {
      ignore: ['**/node_modules/**', 'packages/*/.boldr/'],
      patterns: ['packages/*/src/**/', 'packages/*/internal/**/', 'internal/']
    }
  };
  var shouldWrite = process.argv[2] === 'write';
  var isWindows = process.platform === 'win32';
  var prettier = isWindows ? 'prettier.cmd' : 'prettier';
  var prettierCmd = path.resolve(__dirname, '../node_modules/.bin/' + prettier);
  _logger2.default.info('Loading configuration.');

  var inputOptions = options;
}

module.exports = function register(program) {
  program.command('fmt', 'Format your project with Prettier.').option('-p, --port <num>', 'Dev server port', program.INT, 1).action(task);
};