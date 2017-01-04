exports.up = function(knex) {
  return knex.schema.createTable('menu_menu_detail', (table) => {
    table.integer('menu_id').notNullable().references('id').inTable('menu');
    table.integer('menu_detail_id').notNullable().references('id').inTable('menu_detail');
    table.primary(['menu_id', 'menu_detail_id']);
  });
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists('menu_menu_detail');
};
