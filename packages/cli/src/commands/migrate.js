import path from 'path';
import knex from 'knex';
import fs from 'fs-extra';
import config from '@boldr/config';
import logger from '@boldr/utils/lib/logger';
import appRoot from '@boldr/utils/lib/node/appRoot';

async function task(args, options) {
  logger.task('Creating a new migration');
  const rootDir = appRoot.get();
  fs.ensureDirSync('.boldr/db/migrations');
  const knexConfig = {
    client: 'pg',
    connection: options.dburl || config.get('db.url'),
    migrations: {
      tableName: 'migrations',
      directory: path.resolve(rootDir, '.boldr/db/migrations'),
    },
    seeds: {
      directory: path.resolve(rootDir, '.boldr/db/seeds'),
    },
  };

  const db = knex(knexConfig);
  await db.migrate.latest(knexConfig);
}

function register(program) {
  program
    .command('migrate', 'Run Knex database migration.')
    .help('Database connection url is set in the config file or passed with -u.')
    .option('-u, --url <dburl>', 'Postgres connection string url.')
    .action(task);
}

export default { register };
