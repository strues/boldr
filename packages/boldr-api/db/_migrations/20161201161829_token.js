exports.up = function(knex) {
  return knex.schema.createTable('token', (table) => {
    // pk
    table.increments('id').unsigned().primary();
    table.string('user_verification_token');
    table.string('reset_password_token');
    table.dateTime('reset_password_expiration');
    table.string('oauth_token');
    table.uuid('user_id').unsigned();
    table.timestamp('created_at').defaultTo(knex.fn.now());
    table.timestamp('updated_at').nullable().defaultTo(null);
    // fk
    table.foreign('user_id').references('id').inTable('user').onDelete('cascade').onUpdate('cascade');
    // indexes
    table.index('reset_password_token');
    table.index('user_verification_token');
  });
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists('token');
};
