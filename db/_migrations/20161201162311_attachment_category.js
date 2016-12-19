exports.up = function(knex) {
  return knex.schema.createTable('attachment_category', (table) => {
    table.uuid('category_id').notNullable().references('id').inTable('category').onDelete('cascade').onUpdate('cascade');
    table.uuid('attachment_id').notNullable().references('id').inTable('attachment').onDelete('cascade').onUpdate('cascade');
    table.primary(['category_id', 'attachment_id']);
  });
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists('attachment_category');
};
