const path = require('path');

module.exports = {
  development: {
    client: 'pg',
    connection: process.env.POSTGRES_CONN_URI,
    migrations: {
      directory: path.resolve('./db/_migrations'),
      tableName: 'knex_migrations',
    },
    seeds: {
      directory: path.resolve('./db/_seeds'),
    },
    debug: false,
    pool: {
      min: 0,
      max: 10,
    },
  },
  test: {
    client: 'pg',
    connection: process.env.POSTGRES_CONN_URI,
    migrations: {
      directory: path.resolve('./db/_migrations'),
      tableName: 'knex_migrations',
    },
    seeds: {
      directory: path.resolve('./db/_seeds'),
    },
    debug: false,
  },
  production: {
    client: 'pg',
    searchPath: 'knex,public',
    connection: process.env.POSTGRES_CONN_URI,
    migrations: {
      directory: path.resolve('./db/_migrations'),
      tableName: 'knex_migrations',
    },
    seeds: {
      directory: path.resolve('./db/_seeds'),
    },
    pool: {
      min: 1,
      max: 5,
    },
  },
};
