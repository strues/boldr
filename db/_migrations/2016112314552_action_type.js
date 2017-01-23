
exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.createTableIfNotExists('action_type', (table) => {
      table.increments('id').unsigned().primary();
      table.enu('type', ['create', 'update', 'delete', 'register']).notNullable();

      table.index('type');
    }),
  ]);
};

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.dropTableIfExists('action_type'),
  ]);
};
