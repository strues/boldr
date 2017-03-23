const path = require('path');

module.exports = {
  development: {
    client: 'pg',
    connection: process.env.DATABASE_URI,
    migrations: {
      directory: path.resolve('./db/migrations'),
      tableName: 'migrations',
    },
    seeds: {
      directory: path.resolve('./db/seeds'),
    },
    debug: false,
    pool: {
      min: 0,
      max: 10,
    },
  },
  test: {
    client: 'pg',
    connection: process.env.DATABASE_URI,
    migrations: {
      directory: path.resolve('./db/migrations'),
      tableName: 'migrations',
    },
    seeds: {
      directory: path.resolve('./db/seeds'),
    },
    debug: false,
  },
  production: {
    client: 'pg',
    searchPath: 'knex,public',
    connection: process.env.DATABASE_URI,
    migrations: {
      directory: path.resolve('./db/migrations'),
      tableName: 'migrations',
    },
    seeds: {
      directory: path.resolve('./db/seeds'),
    },
    pool: {
      min: 1,
      max: 5,
    },
  },
};
