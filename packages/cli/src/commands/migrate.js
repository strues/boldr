import path from 'path';
import knex from 'knex';
import fs from 'fs-extra';
import getConfig from '@boldr/config';
import logger from '@boldr/utils/lib/logger';
import appRoot from '@boldr/utils/lib/node/appRoot';

async function task(args, options) {
  logger.task('Cleaning up');

  const config = getConfig();
  const rootDir = appRoot.get();
  fs.ensureDirSync('.boldr/db/migrations');
  const knexConfig = {
    client: 'pg',
    connection: config.server.db.url,
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
    .command('migrate', 'Remove files or directories.')
    .help('By default, cache, assets dir and the compiled server are removed.')
    .option('-u, --url [url]', 'Postgres connection string url.')
    .action(task);
}

export default { register };
