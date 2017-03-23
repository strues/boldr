/* @flow */

import knex from 'knex';

const db = knex({
  client: 'pg',
  connection: process.env.DATABASE_URI,
  migrations: {
    tableName: 'migrations',
  },
  debug: process.env.DATABASE_DEBUG === 'true',
});

async function disconnect(db: Object) {
  try {
    await db.destroy();
  } catch (err) {
    throw new Error(err);
  }
}

export default db;

export { db, disconnect };
