import Knex from 'knex';

const db = Knex({
  client: 'pg',
  connection: process.env.POSTGRES_CONN_URI,
  migrations: {
    tableName: 'migrations',
  },
  debug: process.env.DATABASE_DEBUG === 'true',
});

function disconnect(db) {
  return new Promise((resolve, reject) => {
    db.destroy((err) => {
      if (err) {
        reject(err);
      } else {
        resolve();
      }
    });
  });
}

export default db;

export { db, disconnect };
