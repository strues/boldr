const path = require('path');

module.exports = {
  development: {
    client: 'pg',
    connection: process.env.BOLDR__DB__URL,
    migrations: {
      directory: path.resolve('./.boldr/db/migrations'),
      tableName: 'migrations',
    },
    seeds: {
      directory: path.resolve('./.boldr/db/seeds'),
    },
    debug: false,
    pool: {
      min: 0,
      max: 10,
    },
  },
  test: {
    client: 'pg',
    connection: process.env.BOLDR__DB__URL,
    migrations: {
      directory: path.resolve('./.boldr/db/migrations'),
      tableName: 'migrations',
    },
    seeds: {
      directory: path.resolve('./.boldr/db/seeds'),
    },
    debug: false,
  },
  production: {
    client: 'pg',
    searchPath: 'knex,public',
    connection: process.env.BOLDR__DB__URL,
    migrations: {
      directory: path.resolve('./.boldr/db/migrations'),
      tableName: 'migrations',
    },
    seeds: {
      directory: path.resolve('./.boldr/db/seeds'),
    },
    pool: {
      min: 1,
      max: 5,
    },
  },
};
