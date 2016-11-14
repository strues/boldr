const path = require('path');
const config = require('./config');

const pgConfig = config.get('postgres');
module.exports = {
  development: {
    client: 'pg',
    connection: pgConfig.uri || {
      host: pgConfig.host || 'localhost',
      user: pgConfig.user || 'postgres',
      password: pgConfig.password || 'password',
      database: pgConfig.db || 'boldr',
    },
    migrations: {
      directory: path.resolve(__dirname, '../db/_migrations'),
      tableName: 'knex_migrations',
    },
    seeds: {
      directory: path.resolve(__dirname, '../db/_seeds'),
    },
    debug: false,
    pool: {
      min: 0,
      max: 1,
    },
  },
  test: {
    client: 'pg',
    connection: pgConfig.uri || {
      host: pgConfig.host || 'localhost',
      user: pgConfig.user || 'postgres',
      password: pgConfig.password || 'password',
      database: pgConfig.db || 'boldr',
    },
    migrations: {
      directory: path.resolve(__dirname, '../db/_migrations'),
      tableName: 'knex_migrations',
    },
    seeds: {
      directory: path.resolve(__dirname, '../db/_seeds'),
    },
    debug: false,
    pool: {
      min: 0,
      max: 1,
    },
  },
  production: {
    client: 'pg',
    connection: pgConfig.uri,
    searchPath: 'knex,public',
    migrations: {
      directory: path.resolve(__dirname, '../db/_migrations'),
      tableName: 'knex_migrations',
    },
    seeds: {
      directory: path.resolve(__dirname, '../db/_seeds'),
    },
    pool: {
      min: 2,
      max: 10,
    },
  },
};
