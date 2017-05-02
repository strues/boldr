/* @flow */

// Runs flow type checking.

import { existsSync } from 'fs';
import { resolve as resolvePath } from 'path';
import appRootDir from 'app-root-dir';
import logger from 'boldr-utils/es/logger';
import { exec } from '../utils';

if (!existsSync(resolvePath(appRootDir.get(), './flow-typed'))) {
  logger.info('You haven\'t installed the flow-typed definitions. Please run the `npm run flow:defs` command if you would like to install them.'); // eslint-disable-line
}

try {
  exec('flow; test $? -eq 0 -o $? -eq 2');
} catch (err) {
  // Flow will print any errors.
}
