exports.up = function(knex) {
  return knex.schema.createTable('activity', (table) => {
    table.uuid('id').unsigned().primary();
    table.uuid('user_id').unsigned().notNullable();
    table.integer('action_type_id').unsigned().notNullable();
    table.uuid('activity_post').unsigned();
    table.uuid('activity_user').unsigned();
    table.uuid('activity_attachment').unsigned();
    table.integer('activity_tag').unsigned();
    table.integer('activity_menu_detail').unsigned();
    table.integer('activity_template').unsigned();
    table.uuid('activity_page').unsigned();
    table.integer('activity_role').unsigned();
    table.timestamp('created_at').notNullable().defaultTo(knex.fn.now());
    table.timestamp('updated_at').nullable().defaultTo(null);

    table.foreign('user_id').references('id').inTable('user').onDelete('cascade').onUpdate('cascade');
    table.foreign('action_type_id').references('id').inTable('action_type').onDelete('cascade').onUpdate('cascade');
    table.foreign('activity_post').references('id').inTable('post').onDelete('cascade').onUpdate('cascade');
    table.foreign('activity_user').references('id').inTable('user').onDelete('cascade').onUpdate('cascade');
    table.foreign('activity_attachment').references('id').inTable('attachment').onDelete('cascade').onUpdate('cascade');
    table.foreign('activity_tag').references('id').inTable('tag').onDelete('cascade').onUpdate('cascade');
    table.foreign('activity_menu_detail').references('id').inTable('menu_detail').onDelete('cascade').onUpdate('cascade');
    table.foreign('activity_template').references('id').inTable('template').onDelete('cascade').onUpdate('cascade');
    table.foreign('activity_page').references('id').inTable('page').onDelete('cascade').onUpdate('cascade');
    table.foreign('activity_role').references('id').inTable('role').onDelete('cascade').onUpdate('cascade');
  });
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists('activity');
};
