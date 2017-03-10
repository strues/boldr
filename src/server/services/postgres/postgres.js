import Knex from 'knex';

const db = Knex({
  client: 'pg',
  connection: process.env.POSTGRES_CONN_URI,
  migrations: {
    tableName: 'migrations',
  },
  debug: process.env.DATABASE_DEBUG === 'true',
});

async function disconnect(db) {
  try {
    await db.destroy();
  } catch (err) {
    throw new Error(err);
  }
}

export default db;

export { db, disconnect };
