import fs from 'fs';
import path from 'path';
import dotenv from 'dotenv';
import appRootDir from 'app-root-dir';
import staticConfig from './boldr';

function registerEnvFile() {
  const envName = process.env.NODE_ENV || 'development';
  const envFile = staticConfig.envFileName;

  // This is the order in which we will try to resolve an environment configuration
  // file.
  const envFileResolutionOrder = [
    // Is there an environment config file at the app root for our target
    // environment name?
    path.resolve(appRootDir.get(), `${envFile}.${envName}`),
    // Is there an environment config file at the app root?
    path.resolve(appRootDir.get(), envFile),
  ];

  // Find the first env file path match.
  const envFilePath = envFileResolutionOrder.find(filePath => fs.existsSync(filePath));

  // If we found an env file match the register it.
  if (envFilePath) {
    console.log( // eslint-disable-line no-console
      console.log(`==> Registering environment variables from: ${envFilePath}`),
    );
    dotenv.config({ path: envFilePath });
  }
}

function getStringEnvVar(name, defaultVal) {
  return process.env[name] || defaultVal;
}

function getIntEnvVar(name, defaultVal) {
  return process.env[name]
    ? parseInt(process.env[name], 10)
    : defaultVal;
}

function getBoolVar(name, defaultVal) {
  return process.env[name]
    ? process.env[name] === 'true'
    : defaultVal;
}

// Ensure that we first register any environment variables from an existing
// env file.
registerEnvFile();

export default {
  // The host on which the server should run.
  host: getStringEnvVar('HOST', 'localhost'),
  // The port on which the server should run.
  port: getIntEnvVar('SSR_PORT', 3000),
  apiHost: getStringEnvVar('API_HOST', 'localhost'),
  apiPort: getIntEnvVar('API_PORT', 2121),
  // Enable SSR rendering of the React application?
  // It can be useful to disable this in development in order to debug complex
  // issues with your React components.
  ssrEnabled: getBoolVar('SSR_ENABLED', true),
  // The port on which the client bundle development server should run.
  wpdsPort: getIntEnvVar('WPDS_PORT', 3001),
};
