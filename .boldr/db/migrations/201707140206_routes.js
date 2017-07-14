module.exports.up = async (db) => {
  await db.schema.createTable('route', table => {
    // pk
    table
      .uuid('id')
      .notNullable()
      .defaultTo(db.raw('uuid_generate_v4()'))
      .primary();
    table.string('name', 100).unique().notNullable();
    table.string('slug', 100);
    table.string('uriParts', 255).notNullable();
    table.string('uriPattern', 255).notNullable();
    table.string('template').nullable();

    table.timestamp('createdAt').notNullable().defaultTo(db.fn.now());
    table.timestamp('updatedAt').nullable().defaultTo(null);
    table.timestamp('deletedAt').nullable().defaultTo(null);

    // indexes
    table.index('name');
    table.index('uriParts');
  });
};

module.exports.down = async (db) => {
  await db.schema.dropTableIfExists('route');
};

module.exports.configuration = { transaction: true };
