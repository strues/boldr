module.exports.up = async (db) => {
  await db.schema.createTable('page', table => {
    // pk
    table
      .uuid('id')
      .notNullable()
      .defaultTo(db.raw('uuid_generate_v4()'))
      .primary();
    table.string('title', 255).unique().notNullable();
    table.string('slug', 255).notNullable();
    table.string('url', 255).nullable();
    table.jsonb('meta').nullable();
    table.jsonb('blocks').nullable();
    table.text('markup').nullable();
    table.timestamp('createdAt').notNullable().defaultTo(db.fn.now());
    table.timestamp('updatedAt').nullable().defaultTo(null);
    table.timestamp('deletedAt').nullable().defaultTo(null);

    // indexes
    table.index('slug');
    table.index('url');
  });
};

module.exports.down = async (db) => {
    await db.schema.dropTableIfExists('page');
};

module.exports.configuration = { transaction: true };
