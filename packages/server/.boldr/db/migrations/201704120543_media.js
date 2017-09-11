module.exports.up = async db => {
  await db.schema.createTable('media', table => {
    // pk
    table.uuid('id').notNullable().defaultTo(db.raw('uuid_generate_v1mc()')).primary();

    table
      .string('name', 128)
      .notNullable()
      .unique();
    table.string('safe_name', 128).unique().notNullable();
    table.string('thumb_name', 128);
    table.integer('size');
    table.string('file_description').nullable();
    table.string('type').notNullable();
    table.string('url').notNullable();
    table.string('path').notNullable();
    table.uuid('owner_id').notNullable();
    table
      .foreign('owner_id')
      .references('id')
      .inTable('account')
      .onDelete('cascade')
      .onUpdate('cascade');

    // timestamps
    table.timestamp('created_at').defaultTo(db.fn.now());
    table.timestamp('updated_at').defaultTo(null);

    table.index('name');
    table.index('owner_id');
    table.index('url');
  });

  await db.schema.createTable('article_media', table => {
    table
      .uuid('article_id')
      .notNullable()
      .references('id')
      .inTable('article')
      .onDelete('cascade')
      .onUpdate('cascade');
    table
      .uuid('media_id')
      .notNullable()
      .references('id')
      .inTable('media')
      .onDelete('cascade')
      .onUpdate('cascade');

    table.primary(['article_id', 'media_id']);
  });
};

module.exports.down = async db => {
  await db.schema.dropTableIfExists('media');
  await db.schema.dropTableIfExists('article_media');
};

module.exports.configuration = { transaction: true };
