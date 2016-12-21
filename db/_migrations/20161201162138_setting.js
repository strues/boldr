exports.up = function(knex) {
  return knex.schema.createTable('setting', (table) => {
    table.increments('id').unsigned().primary();
    table.uuid('uuid').notNullable().unique();
    table.string('key', 100).notNullable();
    table.string('label', 100).notNullable();
    table.string('value', 255).notNullable();
    table.string('description', 255).notNullable();

    table.index('uuid');
    table.index('key');
  });
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists('setting');
};
