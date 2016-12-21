
/* @flow */

// This script removes any exisitng build output.

import { resolve as pathResolve } from 'path';
import appRootDir from 'app-root-dir';
import { exec } from '../utils';
import boldrConfig from '../../config/boldr';

const cmd = `$(npm bin)/rimraf ${pathResolve(appRootDir.get(), boldrConfig.buildOutputPath)}`;

exec(cmd);
