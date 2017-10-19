module.exports.up = async (db) => {
  await db.schema.createTable('route', table => {
    // pk
    table.uuid('id').notNullable().defaultTo(db.raw('uuid_generate_v1mc()')).primary();

    table.string('name', 50).unique().notNullable();
    table.string('slug', 50).unique().notNullable();
    table.string('uri_parts', 255).notNullable();
    table.string('uri_pattern', 255).notNullable();
    table.string('template').nullable();

    // indexes
    table.index('name');
    table.index('uri_parts');
  });
};

module.exports.down = async (db) => {
  await db.schema.dropTableIfExists('route');
};

module.exports.configuration = { transaction: true };
