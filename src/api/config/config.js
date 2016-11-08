const appRootPath = require('app-root-path');
const nconf = require('nconf');

const pjson = require(`${appRootPath}/package.json`);

nconf.use('memory');

nconf
// Allow overwrites from env
  .env({
    whitelist: [
      'node_env',
      'redis__uri',
      'redis__host',
      'redis__port',
      'redis__database',
      'redis__password',
      'postgres__uri',
      'postgres__host',
      'postgres__port',
      'postgres__database',
      'postgres__password',
      'session__secret',
      'aws__keyId',
      'aws__keySecret',
      'aws__bucket',
      'aws__region',
      'mail__mg_api_key',
      'host',
      'port',
      'ssr_port',
      'api_host',
      'ssr_host',
    ],
    lowerCase: false,
    separator: '__',
  });

const host = nconf.get('host') || 'localhost';
const port = nconf.get('port') || 2121;
const ssrhost = nconf.get('ssrhost') || 'localhost';
const ssrport = nconf.get('ssrport') || 3000;
// Set defaults
nconf.defaults({
  app: pjson.name,
  version: pjson.version,
  node_env: 'development',
  port,
  host,
  ssrhost,
  ssrport,
  api_host: `http://${host}:${port}`,
  ssr_host: `http://${ssrhost}:${ssrport}`,
  prefix: '/api/v1',
  date_format: 'yyyy-MM-dd',
  time_zone: '-07:00',
  db: {
    uri: 'postgres://postgres:password@127.0.0.1:5432/boldr',
    host: '127.0.0.1',
    port: 5432,
    database: 'boldr',
    user: 'postgres',
    password: 'password',
  },
  redis: {
    uri: 'redis://127.0.0.1:6379/1',
    host: '127.0.0.1',
    port: 6379,
    database: 1,
    password: null,
  },
  private_key: null,
  public_key: null,
  salt_rounds: 10,
  session: {
    secret: 'b0ldry0l',
    expiration: 60 * 60 * 24, // 1 day
  },
  mail: {
    endpoint: null,
    mg_api_key: null,
    domain: 'boldr.io',
    from: 'mail@boldr.io',
    transport: 'mailgun',
  },
  aws: {
    keyId: null,
    keySecret: null,
    bucket: 'boldrcms',
    region: 'us-west-1',
  },
  logger: {
    console: true,
    file: false,
  },
});

module.exports = nconf;
