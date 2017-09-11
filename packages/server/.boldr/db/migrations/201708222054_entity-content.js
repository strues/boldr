module.exports.up = async db => {
  await db.schema.createTable('content_type', table => {
    // pk
    table.uuid('id').notNullable().defaultTo(db.raw('uuid_generate_v1mc()')).primary();
    table.string('name', 140).unique().notNullable();
    table.string('slug', 140).unique().notNullable();
    table.string('icon', 140).nullable();
    table.text('description').nullable();
    table.boolean('restricted').default(false);
    // timestamp
    table.timestamp('created_at').notNullable().defaultTo(db.fn.now());
    table.timestamp('updated_at').nullable().defaultTo(null);
    table.timestamp('deleted_at').nullable().defaultTo(null);
    // indexes
    table.index('slug');
    table.index('created_at');
  });

  await db.schema.createTable('entity', table => {
    // pk
    table.uuid('id').notNullable().defaultTo(db.raw('uuid_generate_v1mc()')).primary();

    table.string('title', 140).unique().notNullable();
    table.string('slug', 140).unique().notNullable();
    table.string('image', 255).nullable();
    table.json('meta').nullable();
    table.json('raw_content').nullable();
    table.text('content').nullable();
    table.text('excerpt').nullable();
    table.enu('status', ['published', 'archived', 'draft']).notNullable();

    // fks
    table.uuid('content_type_id').notNullable();
    table.uuid('author_id');
    table.uuid('category_id');

    // timestamp
    table.timestamp('created_at').notNullable().defaultTo(db.fn.now());
    table.timestamp('updated_at').nullable().defaultTo(null);
    table.timestamp('deleted_at').nullable().defaultTo(null);

    // fk | uuid
    table
      .foreign('content_type_id')
      .references('id')
      .inTable('content_type')
      .onDelete('cascade')
      .onUpdate('cascade');
    table
      .foreign('author_id')
      .references('id')
      .inTable('account')
      .onDelete('cascade')
      .onUpdate('cascade');
      table
      .foreign('category_id')
      .references('id')
      .inTable('category')
      .onDelete('cascade')
      .onUpdate('cascade');

    // indexes
    table.index('slug');
    table.index('status');
    table.index('created_at');
    table.index('category_id');
    table.index('author_id')
    table.index('content_type_id')
  });



  await db.schema.createTable('entity_tag', table => {
    // pk
    table.increments('id').primary();
    // fk
    table.uuid('tag_id').notNullable();
    table.uuid('entity_id').notNullable();
    table.unique(['tag_id', 'entity_id']);

    table
      .foreign('tag_id')
      .references('id')
      .inTable('tag')
      .onDelete('cascade')
      .onUpdate('cascade');
    table
      .foreign('entity_id')
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
