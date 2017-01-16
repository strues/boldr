exports.up = function(knex) {
  return knex.schema.createTable('post_attachment', (table) => {
    table.uuid('post_id').notNullable().references('id').inTable('post').onDelete('cascade').onUpdate('cascade');
    table.uuid('attachment_id').notNullable().references('id').inTable('attachment').onDelete('cascade').onUpdate('cascade');
    table.primary(['post_id', 'attachment_id']);
  });
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists('post_attachment');
};
