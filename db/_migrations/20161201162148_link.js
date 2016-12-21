exports.up = function(knex) {
  return knex.schema.createTable('menu_detail', (table) => {
    table.increments('id').unsigned().primary();
    table.uuid('uuid').notNullable().unique();
    table.string('label', 50).notNullable();
    table.string('name', 50).notNullable();
    table.string('attribute', 255).nullable();
    table.integer('position');
    table.integer('parent_id').nullable();
    table.string('link').notNullable();
    table.string('icon').nullable();

    table.index('label');
    table.index('uuid');
    table.index('link');
  });
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists('menu_detail');
};
