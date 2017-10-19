import path from 'path';
import knex from 'knex';

import config from '@boldr/config';
import logger from '@boldr/utils/lib/logger';
import appRoot from '@boldr/utils/lib/node/appRoot';

async function task(args, options) {
  logger.task('Seeding database');
  const rootDir = appRoot.get();
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
  try {
    await db.seed.run(knexConfig);
    logger.info('Database populated.');
    process.exit(0);
  } catch (err) {
    logger.error(err);
    process.exit(1);
  }
}

function register(program) {
  program
    .command('seed', 'Remove files or directories.')
    .help('By default, cache, assets dir and the compiled server are removed.')
    .option('-u,  --url <dburl>', 'Database connection url')
    .action(task);
}

export default { register };
