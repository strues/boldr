exports.up = function(knex) {
  return knex.schema.createTable('link', (table) => {
    table.increments('id').unsigned().primary();
    table.uuid('uuid').notNullable().unique();
    table.string('label', 50).notNullable();
    table.string('name', 50).notNullable();
    table.integer('position');
    table.string('href').notNullable();
    table.string('icon').nullable();

    table.index('label');
    table.index('uuid');
    table.index('href');
  });
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists('link');
};
