import knex from 'knex';
import { Model } from 'objection';
import getConfig from '@boldr/config';

const config = getConfig();

const knexOpts = {
  client: 'pg',
  connection: config.server.db.url,
  searchPath: 'knex,public',
  pool: {
    min: 2,
    max: 10,
  },
  migrations: {
    tableName: 'migrations',
  },
  debug: process.env.DATABASE_DEBUG === 'true',
};

const db = knex(knexOpts);
Model.knex(db);

async function disconnect(db) {
  if (!db) {
    return;
  }
  try {
    await db.destroy();
  } catch (err) {
    throw new Error(err);
  }
}

export default db;

export { disconnect };
