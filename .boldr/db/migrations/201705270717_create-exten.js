module.exports.up = async (db) => {
  const extension = 'pg_trgm';
  const createExtension = `CREATE EXTENSION ${extension}`;
  return db.raw(createExtension);
};

module.exports.down = async (db) => {
  db.raw(`DROP EXTENSION ${extension}`);
};

module.exports.configuration = { transaction: true };
