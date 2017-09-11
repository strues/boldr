module.exports.up = async db => {
  await db.schema.createTable('content_type', table => {
    // pk
    table.uuid('id').notNullable().defaultTo(db.raw('uuid_generate_v4()')).primary();
    table.string('name', 140).unique().notNullable();
    table.string('slug', 140).unique().notNullable();
    table.string('icon', 140).nullable();
    table.text('description').nullable();
    table.boolean('restricted').default(false);
    // timestamp
    table.timestamp('createdAt').notNullable().defaultTo(db.fn.now());
    table.timestamp('updatedAt').nullable().defaultTo(null);
    table.timestamp('deletedAt').nullable().defaultTo(null);
    // indexes
    table.index('slug');
    table.index('createdAt');
  });

  await db.schema.createTable('entity', table => {
    // pk
    table.uuid('id').notNullable().defaultTo(db.raw('uuid_generate_v4()')).primary();

    table.string('title', 140).unique().notNullable();
    table.string('slug', 140).unique().notNullable();
    table.string('image', 255).nullable();
    table.json('meta').nullable();
    table.json('rawContent').nullable();
    table.text('content').nullable();
    table.text('excerpt').nullable();
    table.enu('status', ['published', 'archived', 'draft']).notNullable();

    // fks
    table.uuid('contentTypeId').notNullable();
    table.uuid('authorId');
    table.uuid('categoryId');

    // timestamp
    table.timestamp('createdAt').notNullable().defaultTo(db.fn.now());
    table.timestamp('updatedAt').nullable().defaultTo(null);
    table.timestamp('deletedAt').nullable().defaultTo(null);

    // fk | uuid
    table
      .foreign('contentTypeId')
      .references('id')
      .inTable('content_type')
      .onDelete('cascade')
      .onUpdate('cascade');
    table
      .foreign('authorId')
      .references('id')
      .inTable('user')
      .onDelete('cascade')
      .onUpdate('cascade');
      table
      .foreign('categoryId')
      .references('id')
      .inTable('category')
      .onDelete('cascade')
      .onUpdate('cascade');

    // indexes
    table.index('slug');
    table.index('status');
    table.index('createdAt');
    table.index('categoryId');
    table.index('authorId')
    table.index('contentTypeId')
  });



  await db.schema.createTable('entity_tag', table => {
    // pk
    table.increments('id').primary();
    // fk
    table.uuid('tagId').notNullable();
    table.uuid('entityId').notNullable();
    table.unique(['tagId', 'entityId']);

    table
      .foreign('tagId')
      .references('id')
      .inTable('tag')
      .onDelete('cascade')
      .onUpdate('cascade');
    table
      .foreign('entityId')
      .references('id')
      .inTable('entity')
      .onDelete('cascade')
      .onUpdate('cascade');
  });
};

module.exports.down = async db => {
  await db.schema.dropTableIfExists('content_type');
  await db.schema.dropTableIfExists('entity');
  await db.schema.dropTableIfExists('entity_tag');
};

module.exports.configuration = { transaction: true };
