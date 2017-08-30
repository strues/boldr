/*! @boldr/config v0.1.0-alpha.1 by Steven Truesdell <steven@strues.io> */
'use strict';

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var path = _interopDefault(require('path'));
var fs = _interopDefault(require('fs-extra'));
var appRoot = _interopDefault(require('@boldr/utils/lib/node/appRoot'));
var merge = _interopDefault(require('lodash.merge'));

/* eslint-disable camelcase */

var defaultConfig = {
  server: {
    websiteUrl: 'http://localhost:3000',
    port: 2121,
    protocol: 'http',
    host: '0.0.0.0',
    prefix: '/api/v1',
    graphiql: true,
    optics: true,
    logging: {
      level: 'debug',
      file: false
    },
    token: {
      secret: 'b0ldrk3kwi11s15',
      expiration: 604800000
    },
    mail: {
      host: 'smtp.example.com',
      user: 'user@user.com',
      password: 'password',
      port: 465,
      ssl: true,
      from: 'hello@boldr.io'
    },
    db: {
      url: 'postgres://postgres:password@localhost:5432/boldr'
    },
    redis: {
      url: 'redis://127.0.0.1:6379/0'
    }
  },
  paths: {
    publicPath: '/static/',
    entry: {
      server: 'src/serverEntry.js',
      client: 'src/clientEntry.js'
    },
    output: {
      server: 'build/server',
      client: 'build/client'
    },
    vendor: 'src/vendor.js'
  },
  vendor: [],
  tools: {
    profile: false
  }
};

var debug = require('debug')('boldr:config:loadConfig');

function loadConfig(configPath) {
  debug('Loading config file:', configPath);
  var configModulePath = configPath;
  // first clean up require cache so we always load fresh config
  delete require.cache[configModulePath];
  // then require the fresh config
  var config = require(configModulePath); // eslint-disable-line global-require
  return merge(defaultConfig, config);
}

var configFileName = 'config.js';
var ROOT_DIR = appRoot.get();

function freeze(config) {
  return Object.freeze(Object.keys(config).reduce(function (result, key) {
    var descriptor = { enumerable: true };
    if (typeof config[key] === 'function') {
      descriptor.get = config[key];
    } else {
      descriptor.value = config[key];
    }
    return Object.defineProperty(result, key, descriptor);
  }, {}));
}

function getConfig() {
  var configPath = path.resolve(ROOT_DIR, '.boldr/' + configFileName);
  fs.ensureFileSync(configPath);
  var config = loadConfig(configPath);

  return freeze(config);
}

module.exports = getConfig;
//# sourceMappingURL=boldr-config.cjs.js.map
