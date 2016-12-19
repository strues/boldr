exports.up = function(knex) {
  return knex.schema.createTable('role', (table) => {
    table.increments('id').unsigned().primary();
    table.uuid('uuid').notNullable().unique();
    table.string('name', 64).notNullable().unique();
    table.string('image', 200).nullable();
    table.text('description').nullable();
    table.timestamp('created_at').notNullable().defaultTo(knex.fn.now());
    table.timestamp('updated_at').nullable().defaultTo(null);

    table.index('uuid');
    table.index('name');
  });
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists('role');
};
