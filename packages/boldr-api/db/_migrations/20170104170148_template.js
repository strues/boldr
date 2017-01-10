
exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.createTableIfNotExists('template', (table) => {
      table.uuid('id').unsigned().primary();
      table.integer('internal_id');
      table.string('name', 100).unique().notNullable();
      table.string('label', 100).notNullable();
      table.string('resource');
      table.json('content');
      table.timestamp('created_at').notNullable().defaultTo(knex.fn.now());
      table.timestamp('updated_at').nullable().defaultTo(null);

      table.index('name');
      table.index('internal_id');
    }),
  ]);
};

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.dropTableIfExists('template'),
  ]);
};
