/**
 * Helper for resolving environment specific configuration.
 *
 * It resolves .env files that are supported by the `dotenv` library.
 *
 * Please read the application configuration docs for more info.
 */
import fs from 'fs';
import path from 'path';
import appRootDir from 'app-root-dir';
import chalk from 'chalk';
import dotenv from 'dotenv';

import pkg from '../../package.json';
import onlyIf from '../../shared/core/utils/logic/onlyIf';
import removeNil from '../../shared/core/utils/arrays/removeNil';

// PRIVATES

function registerEnvFile() {
  const CONF_ENV = process.env.CONF_ENV;
  const envFile = '.env';

  // This is the order in which we will try to resolve an environment configuration
  // file.
  const envFileResolutionOrder = removeNil([
    // Is there an environment config file at the app root for our target
    // environment name?
    // e.g. /projects/boldr/.env.development
    onlyIf(CONF_ENV, path.resolve(appRootDir.get(), `${envFile}.${CONF_ENV}`)),
    // Is there an environment config file at the app root?
    // e.g. /projects/boldr/.env
    path.resolve(appRootDir.get(), envFile),
  ]);

  // Find the first env file path match.
  const envFilePath = envFileResolutionOrder.find(filePath => fs.existsSync(filePath));

  // If we found an env file match the register it.
  if (envFilePath) {
    console.log( // eslint-disable-line no-console
      chalk.black.bgYellow(`==> Registering environment variables from: ${envFilePath}`),
    );
    dotenv.config({ path: envFilePath });
  }
}

// Ensure that we first register any environment variables from an existing
// env file.
registerEnvFile();

// EXPORTED HELPERS

export function string(name, defaultVal) {
  return process.env[name] || defaultVal;
}

export function int(name, defaultVal) {
  return process.env[name]
    ? parseInt(process.env[name], 10)
    : defaultVal;
}

export function bool(name, defaultVal) {
  return process.env[name]
    ? process.env[name] === 'true' || process.env[name] === '1'
    : defaultVal;
}
