exports.up = function(knex) {
  return knex.schema.createTable('gallery_attachment', (table) => {
    table.uuid('gallery_id').notNullable().references('id').inTable('gallery').onDelete('cascade').onUpdate('cascade');
    table.uuid('attachment_id').notNullable().references('id').inTable('attachment').onDelete('cascade').onUpdate('cascade');
    table.primary(['gallery_id', 'attachment_id']);
  });
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists('gallery_attachment');
};
