const path = require('path');

module.exports = {
  development: {
    client: 'pg',
    connection: process.env.POSTGRES_CONN_URI || {
      host: process.env.POSTGRES_HOST || 'localhost',
      user: process.env.POSTGRES_USER || 'postgres',
      password: process.env.POSTGRES_PASSWORD || 'password',
      database: process.env.POSTGRES_DB || 'boldr'
    },
    migrations: {
      directory: path.resolve(__dirname, '../db/_migrations'),
      tableName: 'knex_migrations'
    },
    seeds: {
      directory: path.resolve(__dirname, '../db/_seeds')
    },
    debug: false,
    pool: {
      min: 0,
      max: 1
    }
  },
  test: {
    client: 'pg',
    connection: process.env.POSTGRES_CONN_URI || {
      host: process.env.POSTGRES_HOST || 'localhost',
      user: process.env.POSTGRES_USER || 'postgres',
      password: process.env.POSTGRES_PASSWORD || 'password',
      database: process.env.POSTGRES_DB || 'boldr_test'
    },
    migrations: {
      directory: path.resolve(__dirname, '../db/_migrations'),
      tableName: 'knex_migrations'
    },
    seeds: {
      directory: path.resolve(__dirname, '../db/_seeds')
    },
    debug: false,
    pool: {
      min: 0,
      max: 1
    }
  },
  production: {
    client: 'pg',
    connection: process.env.POSTGRES_CONN_URI,
    searchPath: 'knex,public',
    migrations: {
      directory: path.resolve(__dirname, '../db/_migrations'),
      tableName: 'knex_migrations'
    },
    seeds: {
      directory: path.resolve(__dirname, '../db/_seeds')
    },
    pool: {
      min: 2,
      max: 10
    }
  }
};
