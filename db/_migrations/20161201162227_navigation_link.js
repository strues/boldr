exports.up = function(knex) {
  return knex.schema.createTable('navigation_link', (table) => {
    table.integer('navigation_id').notNullable().references('id').inTable('navigation');
    table.integer('link_id').notNullable().references('id').inTable('link');
    table.primary(['navigation_id', 'link_id']);
  });
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists('navigation_link');
};
