import execa from 'execa';
import express from 'express';
import logger from 'boldr-tools/es/logger';
import _debug from 'debug';

// import createServer from '../../server';
import createDevDlls from '../../webpack/createDevDlls';
import handleError from '../../internal/handleError';

const debug = _debug('boldr:cli:dev');

async function task(args, options) {
  const dlls = await createDevDlls();
  const app = express();
  // createServer(app);
}

function register(program) {
  program
    .command('dev', 'Run your Boldr app in development mode.')
    .option('--port <port>', 'port to run on')
    .action(handleError(task));
}

export default { register };
