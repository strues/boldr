exports.up = function(knex) {
  return knex.schema.createTable('category', (table) => {
    table.uuid('id').unsigned().primary();
    table.string('name').unique().notNullable();
    table.enu('type', ['article', 'project', 'page', 'media', 'file']);
    table.string('description');
    table.string('icon');
    table.string('slug');

    table.index('type');
    table.index('name');
  });
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists('category');
};
