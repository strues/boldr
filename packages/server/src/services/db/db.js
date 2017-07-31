import path from 'path';
import knex from 'knex';
import { Model } from 'objection';
import { config } from '../../config';

const knexOpts = {
  client: 'pg',
  connection: config.get('db.url'),
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

function initializeDb() {
  Model.knex(db);
  // Model.setBasePath(path.join(__dirname, '..', '..', 'models'));
  // Model.pickJsonSchemaProperties = false;
  return db.raw('select 1+1 as result');
}

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

export { disconnect, initializeDb };
