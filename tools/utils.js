const HappyPack = require('happypack');
const notifier = require('node-notifier');
const execSync = require('child_process').execSync;
const appRoot = require('app-root-dir');
const chalk = require('chalk');

const appRootPath = appRoot.get();
// This determines how many threads a HappyPack instance can spin up.
// See the plugins section of the webpack configuration for more.


// Generates a HappyPack plugin.
// @see https://github.com/amireh/happypack/
function happyPackPlugin({ name, loaders }) {
  return new HappyPack({
    id: name,
    verbose: false,
    threads: 4,
    loaders
  });
}

// :: [Any] -> [Any]
function removeEmpty(x) {
  return x.filter(y => !!y);
}

// :: bool -> (Any, Any) -> Any
function ifElse(condition) {
  return (then, or) => (condition ? then : or);
}

// :: ...Object -> Object
function merge() {
  const funcArgs = Array.prototype.slice.call(arguments); // eslint-disable-line prefer-rest-params

  return Object.assign.apply(
    null,
    removeEmpty([{}].concat(funcArgs))
  );
}

function createNotification(options = {}) {
  const title = options.title
    ? `${options.title.toUpperCase()}`
    : undefined;

  notifier.notify({
    title,
    message: options.message,
    open: options.open,
  });

  const level = options.level || 'info';
  const msg = ` 📢   ${title} -> ${options.message}`;

  switch (level) {
    case 'warn': console.log(chalkWarning(msg)); break;
    case 'error': console.log(chalkError(msg)); break;
    case 'info':
    default: console.log(chalkInfo(msg));
  }
}

function exec(command) {
  execSync(command, { stdio: 'inherit', cwd: appRootPath });
}

const chalkError = chalk.bgRed.white;
const chalkSuccess = chalk.green;
const chalkWarning = chalk.yellow;
const chalkProcessing = chalk.blue;
const chalkInfo = chalk.cyan;

module.exports = {
  removeEmpty,
  ifElse,
  merge,
  exec,
  happyPackPlugin,
  createNotification,
  chalkError,
  chalkSuccess,
  chalkWarning,
  chalkProcessing,
  chalkInfo,
};
