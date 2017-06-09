import execa from 'execa';
import express from 'express';
import logger from 'boldr-utils/lib/logger';
import _debug from 'debug';

// import createServer from '../../server';
import createDevDlls from '../../webpack/createDevDlls';
import handleError from '../../internal/handleError';

var debug = _debug('boldr:cli:dev');

function task(args, options) {
  return new Promise(function ($return, $error) {
    var dlls, app;
    return Promise.resolve(createDevDlls()).then(function ($await_1) {
      try {
        dlls = $await_1;
        app = express();
        return $return();
      } catch ($boundEx) {
        return $error($boundEx);
      }
    }.bind(this), $error);
  }.bind(this));
}

function register(program) {
  program.command('dev', 'Run your Boldr app in development mode.').option('--port <port>', 'port to run on').action(handleError(task));
}

export default { register: register };