import http from 'http';
import { resolve as pathResolve } from 'path';
import { Model } from 'objection';

import getConfig from '../config/get';
import db from './services/postgres';
import logger from './services/logger';
import app from './app';

global.Promise = require('bluebird');

const debug = require('debug')('boldr:engine');

const port = getConfig('port');

require('dotenv').load({ silent: true });

app.set('port', port);
app.set('json spaces', 2);
const server = http.createServer(app);
Model.knex(db);

// Create an http listener for our express app.
const listener = server.listen(getConfig('port'), getConfig('host'), () =>
  console.log(`Server listening on port ${getConfig('port')}`),
);

export default listener;
