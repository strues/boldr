exports.up = function(knex) {
  return knex.schema.createTable('page', (table) => {
    table.uuid('id').unsigned().primary();
    table.string('name').unique().notNullable();
    table.string('label');
    table.string('url').unique().notNullable();
    table.json('layout');
    table.json('data');
    table.enu('status', ['published', 'draft', 'archived']).defaultTo('draft');
    table.boolean('restricted').default(false);
    table.json('meta');
    table.timestamp('created_at').notNullable().defaultTo(knex.fn.now());
    table.timestamp('updated_at').nullable().defaultTo(null);

    table.index('name');
  });
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists('page');
};
