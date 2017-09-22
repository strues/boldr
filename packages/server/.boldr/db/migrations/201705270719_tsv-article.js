module.exports.up = async db => {
  const indexName = 'tsv_idx';
  const column = 'title';
  const table = 'article';
  const query = `CREATE INDEX ${indexName} ON ${table} USING gin(${column} gin_trgm_ops)`;
  return db.raw(query);
};

module.exports.down = async db => {
  return db.raw(`DROP INDEX ${indexName}`);
};

module.exports.configuration = { transaction: true };
