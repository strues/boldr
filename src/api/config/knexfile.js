const path = require('path');
const config = require('./config');

module.exports = {
  development: {
    client: 'pg',
    connection: config.get('postgres__uri') || {
      host: config.get('postgres__host') || 'localhost',
      user: config.get('postgres__user') || 'postgres',
      password: config.get('postgres__password') || 'password',
      database: config.get('postgres__database') || 'boldr',
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
    connection: config.get('postgres__uri') || {
      host: config.get('postgres__host') || 'localhost',
      user: config.get('postgres__user') || 'postgres',
      password: config.get('postgres__password') || 'password',
      database: config.get('postgres__database') || 'boldr',
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
    connection: config.get('postgres__uri'),
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
