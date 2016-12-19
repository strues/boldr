exports.up = function(knex) {
  return knex.schema.createTable('activity', (table) => {
    table.uuid('id').unsigned().primary();
    table.string('name', 100);
    table.uuid('user_id').references('id').inTable('user').onDelete('cascade').onUpdate('cascade');
    table.string('action');
    table.enu('type', ['create', 'update', 'delete', 'register']).notNullable();
    table.json('data');
    table.uuid('entry_uuid').notNullable();
    table.string('entry_table').notNullable();
    table.timestamp('created_at').notNullable().defaultTo(knex.fn.now());
    table.timestamp('updated_at').nullable().defaultTo(null);
  });
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists('activity');
};
