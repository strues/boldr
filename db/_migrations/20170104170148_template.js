
exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.createTableIfNotExists('template', (table) => {
      table.increments('id').unsigned().primary();
      table.uuid('uuid');
      table.string('name', 100).unique().notNullable();
      table.string('slug', 110).notNullable();
      table.json('meta');
      table.json('content');
      table.timestamp('created_at').notNullable().defaultTo(knex.fn.now());
      table.timestamp('updated_at').nullable().defaultTo(null);

      table.index('slug');
      table.index('uuid');
    }),
  ]);
};

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.dropTableIfExists('template'),
  ]);
};
