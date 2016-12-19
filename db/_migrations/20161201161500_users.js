exports.up = function(knex) {
  return knex.schema.createTable('user', (table) => {
    table.uuid('id').unsigned().primary();
    table.string('email', 100).unique().notNullable();
    table.string('password', 64).notNullable();
    table.string('first_name', 50).notNullable();
    table.string('last_name', 50).notNullable();
    table.string('display_name', 100).notNullable();
    table.string('avatar_url', 200).defaultTo('https://boldr.io/images/unknown-avatar.png');
    table.string('profile_image', 200).nullable();
    table.string('location', 100).nullable();
    table.text('bio').nullable();
    table.date('birthday', 8).nullable();
    table.string('website', 100).nullable();
    table.boolean('verified').defaultTo(false);
    table.integer('role').references('id').inTable('role').onDelete('cascade').onUpdate('cascade');
    table.timestamp('created_at').notNullable().defaultTo(knex.fn.now());
    table.timestamp('updated_at').nullable().defaultTo(null);

    table.index('verified');
    table.index('email');
  });
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists('user');
};
