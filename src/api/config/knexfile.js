const path = require('path');
const config = require('./config');

const pgConfig = config.get('postgres');
module.exports = {
  development: {
    client: 'pg',
    connection: pgConfig.get('uri') || {
      host: pgConfig.get('host') || 'localhost',
      user: pgConfig.get('user') || 'postgres',
      password: pgConfig.get('password') || 'password',
      database: pgConfig.get('database') || 'boldr',
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
    connection: pgConfig.get('uri') || {
      host: pgConfig.get('host') || 'localhost',
      user: pgConfig.get('user') || 'postgres',
      password: pgConfig.get('password') || 'password',
      database: pgConfig.get('database') || 'boldr',
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
    connection: pgConfig.get('uri'),
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
