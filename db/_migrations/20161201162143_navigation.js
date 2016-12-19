exports.up = function(knex) {
  return knex.schema.createTable('navigation', (table) => {
    table.increments('id').unsigned().primary();
    table.uuid('uuid').notNullable().unique();
    table.string('name').notNullable();
    table.string('label').notNullable();
    table.boolean('restricted').default(false);
    table.enu('location', ['header', 'sidebar', 'footer', 'admin']).defaultTo('header');
    table.json('dropdown');

    table.index('uuid');
    table.index('label');
  });
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists('navigation');
};
