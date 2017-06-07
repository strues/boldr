const logger = console;

const print = (level, text) => {
  const verbose = process.env.BOLDR__DEBUG === 'true';

  let msg = '';
  let logObject = false;

  if (level === 'task') {
    msg = '✅  ';
  } else if (level === 'start') {
    msg = '\n🚀  ';
  } else if (level === 'end') {
    msg = '\n👌  ';
  } else if (level === 'info') {
    msg = '⚡  ';
  } else if (level === 'warn') {
    msg = '⚠️  ';
  } else if (level === 'error') {
    msg = '\n💩  ';
  } else if (level === 'debug') {
    msg = '🐞  ';
  }

  msg += text;

  // Adds optional verbose output
  if (verbose) {
    if (typeof verbose === 'object') {
      logObject = true;
    } else {
      msg += `\n${verbose}`;
    }
  }

  logger.log(msg);
  if (['start', 'end', 'error'].indexOf(level) > -1) {
    logger.log();
  }
  if (logObject) {
    logger.dir(verbose, {
      depth: 15,
    });
  }
};
// Printing any statements
const log = text => {
  logger.log(text);
};

// Starting a process
const start = text => {
  print('start', text);
};

// Ending a process
const end = text => {
  print('end', text);
};

// Tasks within a process
const task = text => {
  print('task', text);
};

// Info about a process task
const info = text => {
  print('info', text);
};

// Verbose output
// takes optional data
const debug = (text, data) => {
  print('debug', text, data);
};

// Warn output
const warn = (text, data) => {
  print('warn', text, data);
};

// Error output
// takes an optional error
const error = (text, err) => {
  print('error', text, err);
};

module.exports = {
  log,
  task,
  info,
  debug,
  warn,
  error,
  start,
  end,
};
