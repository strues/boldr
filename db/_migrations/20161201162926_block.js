
exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.createTableIfNotExists('block', (table) => {
      table.uuid('id').unsigned().primary();
      table.string('name', 100).unique().notNullable();
      table.enu('element', ['header', 'footer', 'navigation', 'hero', 'text']);
      table.json('content');
      table.timestamp('created_at').notNullable().defaultTo(knex.fn.now());
      table.timestamp('updated_at').nullable().defaultTo(null);

      table.index('name');
    }),
  ]);
};

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.dropTableIfExists('block'),
  ]);
};
