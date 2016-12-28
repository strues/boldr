/* @flow */
import fs from 'fs';
import path from 'path';
import dotenv from 'dotenv';
import appRootDir from 'app-root-dir';
import colors from 'colors/safe';

function registerEnvFile() {
  const envName = process.env.NODE_ENV || 'development';
  const envFile = '.env';

  // This is the order in which we will try to resolve an environment configuration
  // file.
  const envFileResolutionOrder = [
    // Is there an environment config file at the app root for our target
    // environment name?
    // e.g. /projects/react-universally/.env.development
    path.resolve(appRootDir.get(), `${envFile}.${envName}`),
    // Is there an environment config file at the app root?
    // e.g. /projects/react-universally/.env
    path.resolve(appRootDir.get(), envFile),
  ];

  // Find the first env file path match.
  const envFilePath = envFileResolutionOrder.find(filePath => fs.existsSync(filePath));

  // If we found an env file match the register it.
  if (envFilePath) {
    console.log( // eslint-disable-line no-console
      colors.bgBlue.white(`==> Registering environment variables from: ${envFilePath}`),
    );
    dotenv.config({ path: envFilePath });
  }
}

// Ensure that we first register any environment variables from an existing
// env file.
registerEnvFile();

export function getStringEnvVar(name: string, defaultVal: string) {
  return process.env[name] || defaultVal;
}

export function getIntEnvVar(name: string, defaultVal: number) {
  return process.env[name]
    ? parseInt(process.env[name], 10)
    : defaultVal;
}

export function getBoolVar(name: string, defaultVal: boolean) {
  return process.env[name]
    ? process.env[name] === 'true'
    : defaultVal;
}
