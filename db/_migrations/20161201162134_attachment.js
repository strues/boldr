exports.up = function(knex) {
  return knex.schema.createTable('attachment', (table) => {
    // pk | uuid
    table.uuid('id').unsigned().primary();
    table.string('file_name').unique().notNullable();
    table.string('original_name');
    table.string('file_description');
    table.string('file_type');
    table.uuid('user_id').unsigned().notNullable();
    table.string('url').notNullable();
    table.string('s3_key');
    table.timestamp('created_at').defaultTo(knex.fn.now());
    table.timestamp('updated_at').defaultTo(knex.fn.now());

    table.foreign('user_id').references('id').inTable('user').onDelete('cascade').onUpdate('cascade');
  });
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists('attachment');
};
