module.exports.up = async db => {
  await db.schema.createTable('content_type', table => {
    // pk
    table.increments('id').unsigned().primary();
    // uuid
    table.uuid('uuid').notNullable().defaultTo(db.raw('uuid_generate_v4()'));

    table.string('name', 64).notNullable().unique();
    table.string('safeName', 64).notNullable().unique();
    table.string('image', 200).nullable();
    table.text('description').nullable();

    table.timestamp('createdAt').notNullable().defaultTo(db.fn.now());
    table.timestamp('updatedAt').nullable().defaultTo(null);
    table.timestamp('deletedAt').nullable().defaultTo(null);
    // indexes
    table.index('name');
    table.index('safeName');
    table.index('uuid');
  });
  await db.schema.createTable('block', table => {
    table
      .uuid('id')
      .notNullable()
      .defaultTo(db.raw('uuid_generate_v4()'))
      .primary();
    table
      .integer('contentTypeId')
      .unsigned()
      .references('id')
      .inTable('content_type');
    table.string('key', 64);
    table.jsonb('content');
    table.jsonb('entities');

    table.timestamp('createdAt').notNullable().defaultTo(db.fn.now());
    table.timestamp('updatedAt').nullable().defaultTo(null);
    table.timestamp('deletedAt').nullable().defaultTo(null);
    // indexes
  });
  await db.schema.createTable('block_relation', table => {
    // pk
    table.increments('id').unsigned().primary();
    table
      .uuid('parentId')
      .unsigned()
      .references('id')
      .inTable('block')
      .onDelete('CASCADE');
    table
      .uuid('childId')
      .unsigned()
      .references('id')
      .inTable('block')
      .onDelete('CASCADE');
  });
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
  await db.schema.dropTableIfExists('content_type');
  await db.schema.dropTableIfExists('block');
  await db.schema.dropTableIfExists('block_relation');
  await db.schema.dropTableIfExists('media_type');
  await db.schema.dropTableIfExists('media');
  await db.schema.dropTableIfExists('article_media');
};

module.exports.configuration = { transaction: true };
