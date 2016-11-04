
exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.createTableIfNotExists('block', (table) => {
      table.uuid('id').primary();
      table.string('name', 100).notNullable();
      table.string('label').unique().notNullable();
      table.enu('element', ['header', 'footer', 'navigation', 'content']);
      table.json('content');
      table.timestamp('created_at').defaultTo(knex.fn.now());
      table.timestamp('updated_at').defaultTo(knex.fn.now());

      table.index('label');
    }),
  ]);
};

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.dropTableIfExists('block'),
  ]);
};
