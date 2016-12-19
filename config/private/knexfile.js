const path = require('path');
const appRoot = require('app-root-dir');
const config = require('./api');

const appRootDir = appRoot.get();

module.exports = {
  development: {
    client: 'pg',
    connection: config.postgres.uri,
    migrations: {
      directory: path.resolve(appRootDir, './db/_migrations'),
      tableName: 'knex_migrations',
    },
    seeds: {
      directory: path.resolve(appRootDir, './db/_seeds'),
    },
    debug: false,
    pool: {
      min: 0,
      max: 1,
    },
  },
  test: {
    client: 'pg',
    connection: config.postgres.uri,
    migrations: {
      directory: path.resolve(appRootDir, './db/_migrations'),
      tableName: 'knex_migrations',
    },
    seeds: {
      directory: path.resolve(appRootDir, './db/_seeds'),
    },
    debug: false,
    pool: {
      min: 0,
      max: 1,
    },
  },
  production: {
    client: 'pg',
    searchPath: 'knex,public',
    connection: config.postgres.uri,
    migrations: {
      directory: path.resolve(appRootDir, './db/_migrations'),
      tableName: 'knex_migrations',
    },
    seeds: {
      directory: path.resolve(appRootDir, './db/_seeds'),
    },
    pool: {
      min: config.postgres.pool.min,
      max: config.postgres.pool.max,
    },
  },
};
