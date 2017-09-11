module.exports.up = async db => {
  await db.schema.createTable('media', table => {
    // pk
    table
      .uuid('id')
      .notNullable()
      .defaultTo(db.raw('uuid_generate_v4()'))
      .primary();

    table
      .string('name', 128)
      .notNullable()
      .unique();
    table.string('safeName', 128).notNullable();
    table.string('thumbName', 128);
    table.integer('size');
    table.string('fileDescription').nullable();
    table.string('type').notNullable();
    table.string('url').notNullable();
    table.string('path').notNullable();
    table.uuid('ownerId').notNullable();
    table
      .foreign('ownerId')
      .references('id')
      .inTable('user')
      .onDelete('cascade')
      .onUpdate('cascade');

    // timestamps
    table.timestamp('createdAt').defaultTo(db.fn.now());
    table.timestamp('updatedAt').defaultTo(db.fn.now());

    table.index('name');
    table.index('ownerId');
    table.index('url');
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
  await db.schema.dropTableIfExists('media');
  await db.schema.dropTableIfExists('article_media');
};

module.exports.configuration = { transaction: true };
