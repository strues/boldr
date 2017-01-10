exports.up = function(knex) {
  return knex.schema.createTable('template_page', (table) => {
    table.increments('id').primary();
    table.uuid('page_id').unsigned().notNullable();
    table.integer('template_id').unsigned().notNullable();

    table.unique(['page_id', 'template_id']);
    table.foreign('page_id').references('id').inTable('page').onDelete('cascade').onUpdate('cascade');
    table.foreign('template_id').references('id').inTable('template').onDelete('cascade').onUpdate('cascade');
  });
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists('template_page');
};
