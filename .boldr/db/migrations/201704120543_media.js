module.exports.up = async db => {
  await db.schema.createTable('media_type', table => {
    // pk
    table.increments('id').primary();
    // uuid
    table.uuid('uuid').notNullable().defaultTo(db.raw('uuid_generate_v4()'));
    table.string('mediaType', 32).notNullable().unique();
    table.timestamp('createdAt').notNullable().defaultTo(db.fn.now());
    table.timestamp('updatedAt').nullable().defaultTo(null);

    table.index('uuid');
    table.index('mediaType');
  });
  await db.schema.createTable('media', table => {
    // pk
    table
      .uuid('id')
      .notNullable()
      .defaultTo(db.raw('uuid_generate_v4()'))
      .primary();
    table.string('fileName', 128).notNullable().unique();
    table.string('safeName', 128).notNullable();
    table.string('thumbName', 128);
    table.string('fileDescription').nullable();
    table
      .integer('mediaType')
      .unsigned()
      .references('id')
      .inTable('media_type');
    table.string('mimetype');
    table.string('url').notNullable();
    table.string('path');
    table.uuid('userId').unsigned().references('id').inTable('user');

    table.timestamp('createdAt').defaultTo(db.fn.now());
    table.timestamp('updatedAt').defaultTo(db.fn.now());

    table.index('fileName');
    table.index('url');
    table.index('mediaType');
  });
  await db.schema.createTable('article_media', table => {
    table
      .uuid('articleId')
      .notNullable()
      .references('id')
      .inTable('article')
      .onDelete('cascade')
      .onUpdate('cascade');
    table
      .uuid('mediaId')
      .notNullable()
      .references('id')
      .inTable('media')
      .onDelete('cascade')
      .onUpdate('cascade');
    table.primary(['articleId', 'mediaId']);
  });
};

module.exports.down = async db => {
  await db.schema.dropTableIfExists('media_type');
  await db.schema.dropTableIfExists('media');
  await db.schema.dropTableIfExists('article_media');
};

module.exports.configuration = { transaction: true };
