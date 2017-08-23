module.exports.up = async db => {
  await db.schema.createTable('content_type', table => {
    table.uuid('id').notNullable().defaultTo(db.raw('uuid_generate_v4()')).primary();
    table.string('name', 140).unique().notNullable();
    table.string('slug', 140).unique().notNullable();
    table.string('icon', 140).nullable();
    table.text('description').nullable();

    table.timestamp('createdAt').notNullable().defaultTo(db.fn.now());
    table.timestamp('updatedAt').nullable().defaultTo(null);
    table.timestamp('deletedAt').nullable().defaultTo(null);
    table.index('slug');
    table.index('createdAt');
  });
  await db.schema.createTable('entity', table => {
    table.uuid('id').notNullable().defaultTo(db.raw('uuid_generate_v4()')).primary();
    table.string('title', 140).unique().notNullable();
    table.string('slug', 140).unique().notNullable();
    table.string('image', 255).nullable();
    table.json('meta').nullable();
    table.json('rawContent');
    table.text('content').notNullable();
    table.text('excerpt').nullable();
    table.enu('status', ['published', 'archived', 'draft']).notNullable();
    table.uuid('ctId').unsigned().notNullable();
    table.uuid('userId').unsigned();
    table.timestamp('createdAt').notNullable().defaultTo(db.fn.now());
    table.timestamp('updatedAt').nullable().defaultTo(null);
    table.timestamp('deletedAt').nullable().defaultTo(null);
    // fk | uuid
    table
      .foreign('ctId')
      .references('id')
      .inTable('content_type')
      .onDelete('cascade')
      .onUpdate('cascade');
    table
      .foreign('userId')
      .references('id')
      .inTable('user')
      .onDelete('cascade')
      .onUpdate('cascade');

    table.index('slug');
    table.index('status');
    table.index('createdAt');
  });



  await db.schema.createTable('entity_tag', table => {
    table.increments('id').primary();
    table.uuid('tagId').unsigned().notNullable();
    table.uuid('entityId').unsigned().notNullable();
    table.timestamp('createdAt').notNullable().defaultTo(db.fn.now());
    table.timestamp('updatedAt').nullable().defaultTo(null);
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
