exports.up = function(knex) {
  return knex.schema.createTable('gallery', (table) => {
    table.uuid('id').unsigned().primary();
    table.string('name').unique().notNullable();
    table.string('slug');
    table.string('description');
    table.boolean('restricted').default(false);
    table.enu('status', ['published', 'draft', 'archived']).defaultTo('draft');
    table.timestamp('created_at').notNullable().defaultTo(knex.fn.now());
    table.timestamp('updated_at').nullable().defaultTo(null);
  });
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists('gallery');
};
