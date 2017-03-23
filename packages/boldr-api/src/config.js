const path = require('path');
const fs = require('fs');
const convict = require('convict');
const appRootDir = require('app-root-dir');
const pkg = require('../package.json');

const config = convict({
  env: {
    doc: 'Environment the application is running in',
    format: String,
    default: 'production',
    env: 'NODE_ENV',
  },
  host: {
    doc: 'Hostname/IP for the server',
    default: '0.0.0.0',
    env: 'API_HOST',
  },
  port: {
    doc: 'Port for the server to listen on',
    default: 2121,
    format: Number,
    env: 'API_PORT',
  },
  siteUrl: {
    doc: 'Full address to website',
    format: String,
    default: 'http://localhost:3000',
  },
  apiPrefix: {
    doc: 'Version for the api',
    format: String,
    default: '/api/v1',
  },
  logger: {
    level: {
      doc: 'Logging level',
      format: ['silly', 'debug', 'verbose', 'info', 'warn', 'error'],
      default: 'debug',
      env: 'LOG_LEVEL',
      arg: 'log-level',
    },
    file: {
      enable: {
        doc: 'Enable logging to a file',
        format: Boolean,
        default: false,
        env: 'LOG_FILE',
      },
      path: {
        doc: 'The absolute or relative path to the directory for log files.',
        format: String,
        default: './log',
      },
      filename: {
        doc: 'The name to use for the log file, without extension.',
        format: String,
        default: 'boldr.api',
      },
    },
    morgan: {
      doc: 'Tokens to use for HTTP logging',
      format: String,
      default: ':remote-addr - :remote-user [:date[clf]] ":method :url HTTP/:http-version" :status :res[content-length] ":referrer" ":user-agent" :response-time', // eslint-disable-line
      env: 'HTTP_LOG_FORMAT',
    },
  },
  db: {
    uri: {
      doc: 'The connection uri for Postgres',
      format: String,
      default: 'postgres://postgres:password@localhost:5432/boldr',
      env: 'DATABASE_URI',
    },
    name: {
      doc: 'The name of the database',
      format: String,
      default: 'boldr',
    },
    debug: {
      doc: 'Enable debug mode',
      format: Boolean,
      default: false,
    },
  },
  token: {
    secret: {
      doc: 'Secret phrase for encoding a jwt.',
      format: String,
      default: 'b0ldrk3kwi11s15',
      env: 'TOKEN_SECRET',
    },
  },
  mail: {
    host: {
      doc: 'The mail server host address',
      format: String,
      default: 'mail',
      env: 'MAIL_HOST',
    },
    port: {
      doc: 'The port of the smtp server',
      format: Number,
      default: 465,
      env: 'MAIL_PORT',
    },
    ssl: {
      doc: 'Connect to smtp server with ssl',
      format: Boolean,
      default: true,
      env: 'MAIL_SSL',
    },
    user: {
      doc: 'The user login for the mail server',
      format: String,
      default: 'admin@boldr.io',
      env: 'MAIL_USER',
    },
    password: {
      doc: 'The password for the mail server account',
      format: String,
      default: 'password',
      env: 'MAIL_PASSWORD',
    },
    from: {
      doc: 'The from address for the email',
      format: String,
      default: 'noreply@boldr.io',
    },
  },
});

const env = config.get('env');
const rootDir = appRootDir.get();
const filepath = path.resolve(rootDir, `config.${env}.json`);
if (fs.existsSync(filepath)) {
  config.loadFile(filepath);
}

config.validate();

module.exports = config;
