exports.up = function(knex) {
  return knex.schema.createTable('user_role', (table) => {
    table.increments('id').primary();
    table.uuid('user_id').unsigned().notNullable();
    table.integer('role_id').unsigned().notNullable();

    table.unique(['user_id', 'role_id']);
    table.foreign('user_id').references('id').inTable('user').onDelete('cascade').onUpdate('cascade');
    table.foreign('role_id').references('id').inTable('role').onDelete('cascade').onUpdate('cascade');
  });
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists('user_role');
};
