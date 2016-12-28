exports.up = function(knex) {
  return knex.schema.createTable('post', (table) => {
    // pk | uuid
    table.uuid('id').unsigned().primary();
    table.string('title', 140).unique().notNullable();
    table.string('slug').unique().notNullable();
    table.string('feature_image', 255).nullable();
    table.json('attachments').nullable();
    table.json('meta').nullable();
    table.boolean('featured').defaultTo(false);
    table.text('content').notNullable();
    table.text('excerpt').notNullable();
    table.uuid('user_id').unsigned().notNullable();
    table.enu('status', ['published', 'draft', 'archived']).defaultTo('draft');
    table.timestamp('created_at').notNullable().defaultTo(knex.fn.now());
    table.timestamp('updated_at').nullable().defaultTo(null);
    // fk | uuid
    table.foreign('user_id').references('id').inTable('user').onDelete('cascade').onUpdate('cascade');

    table.index('slug');
    table.index('status');
    table.index('created_at');
  });
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists('post');
};
