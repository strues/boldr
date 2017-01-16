exports.up = function(knex) {
  return knex.schema.createTable('menu', (table) => {
    table.increments('id').unsigned().primary();
    table.uuid('uuid').notNullable().unique();
    table.string('name').notNullable();
    table.string('label').notNullable();
    table.json('attributes').nullable();
    table.boolean('restricted').default(false);
    table.integer('order').notNullable();
    table.index('uuid');
    table.index('label');
  });
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists('menu');
};
