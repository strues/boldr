// This script removes any exisitng build output.

const pathResolve = require('path').resolve;
const appRoot = require('app-root-dir');

const envVars = require('../config/envVars');
const { exec } = require('../utils.js');

const appRootPath = appRoot.get();
const buildOutput = pathResolve(appRootPath, envVars.BUNDLE_OUTPUT_PATH);

const cmd = `$(npm bin)/rimraf ${buildOutput}`;

exec(cmd);
