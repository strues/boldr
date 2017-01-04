exports.up = function(knex) {
  return knex.schema.createTable('tag', (table) => {
    table.increments('id').unsigned().primary();
    table.uuid('uuid').notNullable().unique();
    table.string('name').notNullable().unique();
    table.string('description').nullable();

    // indexes
    table.index('uuid');
    table.index('name');
  });
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists('tag');
};
