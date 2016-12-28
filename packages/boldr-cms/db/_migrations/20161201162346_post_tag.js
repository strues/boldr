exports.up = function(knex) {
  return knex.schema.createTable('post_tag', (table) => {
    table.increments('id').primary();
    table.uuid('post_id').unsigned().notNullable();
    table.integer('tag_id').unsigned().notNullable();

    table.unique(['post_id', 'tag_id']);
    table.foreign('post_id').references('id').inTable('post').onDelete('cascade').onUpdate('cascade');
    table.foreign('tag_id').references('id').inTable('tag').onDelete('cascade').onUpdate('cascade');
  });
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists('post_tag');
};
