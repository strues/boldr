import path from 'path';
import fs from 'fs';
import convict from 'convict';

/**
 * This module provides a single source of truth for application configuration
 * info. It uses node-convict to read configuration info from, in increasing
 * order of precedence:
 *
 * 1. Default value
 * 2. File (`config.loadFile()`) - app root `config.<NODE_ENV>.json`
 * 3. Environment variables
 * 4. Command line arguments
 * 5. Set and load calls (config.set() and config.load())
 *
 * Note that environment variables have _higher_ precedence than values in
 * config files, so the config files will only work if environment variables
 * are cleared.
 *
 * @module config
 */

export const config = convict({
  env: {
    format: ['production', 'development', 'test'],
    default: 'development',
    env: 'NODE_ENV',
  },
  isDev: {
    format: Boolean,
    default: true,
  },
  isProd: {
    format: Boolean,
    default: false,
  },
  api: {
    port: {
      format: 'port',
      default: 8080,
      arg: 'api-port',
      env: 'API_PORT',
    },
    protocol: {
      format: String,
      default: 'http',
      env: 'API_PROTOCOL',
    },
    host: {
      format: 'ipaddress',
      default: '0.0.0.0',
      env: 'API_HOST',
      doc: 'The IP address to bind on the host. Needs to be 0.0.0.0 for Docker',
    },
    prefix: {
      format: String,
      default: '/api/v1',
      env: 'API_PREFIX',
      doc: 'The prefix for api routes and then the versioning',
    },
  },
  logging: {
    level: {
      format: String,
      default: 'info',
      env: 'LOG_LEVEL',
      doc: 'The highest level of logging for winston to capture',
    },
    file: {
      format: Boolean,
      default: false,
      env: 'LOG_FILE',
      doc: 'Save logs to a file',
    },
  },
  db: {
    url: {
      format: String,
      default: 'postgres://postgres@db:5432/dev',
      env: 'DATABASE_URL',
      doc: 'The connection string for the database',
    },
  },
  redis: {
    url: {
      format: String,
      default: 'redis://redis:6379/0',
      env: 'REDIS_URL',
      doc: 'The connection string for redis',
    },
  },
  token: {
    secret: {
      format: String,
      default: 'b0ldrk3kwi11s15',
      env: 'TOKEN_SECRET',
      doc: 'The secret for the session tokens',
    },
  },
  mail: {
    host: {
      format: String,
      default: 'smtp.example',
      env: 'MAIL_HOST',
      doc: 'The address of the smtp server',
    },
    port: {
      format: 'port',
      default: 465,
      arg: 'mail-port',
      env: 'MAIL_PORT',
    },
    ssl: {
      format: Boolean,
      default: true,
      env: 'MAIL_SSL',
      doc: 'Connect to the mail server using SSL',
    },
    user: {
      format: String,
      default: 'hello@boldr.io',
      env: 'MAIL_USER',
      doc: 'The mail server user',
    },
    password: {
      format: String,
      default: 'password',
      env: 'MAIL_PASSWORD',
      doc: 'The password for the mail user',
    },
    from: {
      format: String,
      default: 'hello@boldr.io',
      env: 'MAIL_FROM',
      doc: 'The outgoing email address.',
    },
  },
});

// Load environment dependent configuration
const configPath = path.resolve(process.cwd(), `config.${config.get('env')}.json`);

const localConfig = fs.existsSync(configPath) ? require(configPath) : {};
config.load(localConfig);

config.set('isProd', config.get('env') === 'production');
config.set('isDev', config.get('env') === 'development');
config.validate();

export default config.getProperties();
