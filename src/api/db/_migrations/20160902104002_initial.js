/* eslint-disable */
exports.up = function(knex, Promise) {
  return Promise.all([
    // user hasOne profile
    // user hasOne token
    knex.schema.createTableIfNotExists('user', function(table) {
      table.uuid('id').primary();
      table.string('email', 100).unique().notNullable();
      table.string('password').notNullable();
      table.string('first_name', 50);
      table.string('last_name', 50);
      table.string('display_name', 100).notNullable();
      table.string('avatar_url', 200).default('https://boldr.io/images/unknown-avatar.png');
      table.string('profile_image', 200);
      table.string('location', 100);
      table.text('bio');
      table.date('birthday', 100);
      table.string('website', 100);
      table.string('facebook_profile', 100);
      table.string('linkedin_profile', 150);
      table.string('github_profile', 100);
      table.string('google_profile', 150);
      table.string('twitter_profile', 100);
      table.string('facebook_id', 150);
      table.string('google_id', 150);
      table.string('twitter_id', 150);
      table.string('linkedin_id', 150);
      table.integer('github_id', 150);
      table.boolean('verified').defaultTo(false);
      table.timestamp('created_at').defaultTo(knex.fn.now());
      table.timestamp('updated_at').defaultTo(knex.fn.now());

      table.index('email')
    }),
    // belongsTo user
    knex.schema.createTableIfNotExists('token', function(table) {
      // pk | uuid
      table.increments('id').primary();
      table.string('user_verification_token');
      table.string('reset_password_token');
      table.dateTime('reset_password_expiration');
      table.string('oauth_token');
      table.uuid('user_id').unsigned();
      table.timestamp('created_at').defaultTo(knex.fn.now());
      table.timestamp('updated_at').defaultTo(knex.fn.now());

      table.foreign('user_id').references('id').inTable('user').onDelete('cascade').onUpdate('cascade');
      // indexes
      table.index('reset_password_token');
      table.index('user_verification_token');
    }),
    knex.schema.createTableIfNotExists('role', function(table) {
      // pk | uuid
      table.increments('id').primary();
      table.string('name').notNullable().unique();
      table.string('image');
      table.text('description');
      table.timestamp('created_at').defaultTo(knex.fn.now());
      table.timestamp('updated_at').defaultTo(knex.fn.now());
      table.index('name');
    }),
    // M2M
    knex.schema.createTableIfNotExists('user_role', function(table) {
      // pk
      table.increments('id').primary();
      // fk | uuid
      table.uuid('user_id').unsigned().notNullable();
      // fk | int
      table.integer('role_id').unsigned().notNullable();
      table.unique(['user_id', 'role_id']);
      table.foreign('role_id').references('id').inTable('role').onDelete('cascade').onUpdate('cascade');
      table.foreign('user_id').references('id').inTable('user').onDelete('cascade').onUpdate('cascade');
    }),

    knex.schema.createTableIfNotExists('tag', function(table) {
      // pk | int
      table.increments('id').primary();
      table.uuid('uuid').notNullable();
      table.string('name').notNullable().unique();
      table.string('description');
      table.timestamp('created_at').defaultTo(knex.fn.now());
      table.timestamp('updated_at').defaultTo(knex.fn.now());
      table.index('name');
      table.index('uuid');
    }),
    knex.schema.createTableIfNotExists('post', function(table) {
      // pk | uuid
      table.uuid('id').primary();
      table.string('title', 140).unique().notNullable();
      table.string('slug').unique().notNullable();
      table.string('feature_image');
      table.string('background_image');
      table.json('attachments');
      table.text('content').notNullable();
      table.text('excerpt');
      table.enu('status', ['published', 'draft', 'archived']).defaultTo('draft');
      // fk | uuid
      table.uuid('user_id').references('id').inTable('user').onDelete('restrict').onUpdate('cascade');
      table.json('meta');
      table.timestamp('created_at').defaultTo(knex.fn.now());
      table.timestamp('updated_at').defaultTo(knex.fn.now());
      table.index('slug');
      table.index('status');
      table.index('created_at');
    }),
    knex.schema.createTableIfNotExists('post_tag', function(table) {
      table.increments('id').primary();
      table.uuid('post_id').unsigned().notNullable();
      table.integer('tag_id').unsigned().notNullable();
      table.unique(['post_id', 'tag_id']);
      table.foreign('post_id').references('id').inTable('post').onDelete('cascade').onUpdate('cascade');
      table.foreign('tag_id').references('id').inTable('tag').onDelete('cascade').onUpdate('cascade');
    }),
    knex.schema.createTableIfNotExists('attachment', function(table) {
      table.uuid('id').primary();
      table.string('file_name').unique().notNullable();
      table.string('original_name');
      table.string('file_description');
      table.string('file_type');
      table.uuid('user_id').references('id').inTable('user').onDelete('cascade').onUpdate('cascade');
      table.string('url').notNullable();
      table.string('s3_key');
      table.timestamp('created_at').defaultTo(knex.fn.now());
      table.timestamp('updated_at').defaultTo(knex.fn.now());
    }),

    knex.schema.createTableIfNotExists('setting', function(table) {
      table.increments('id').primary();
      table.string('key', 100).notNullable();
      table.string('value', 255).notNullable();
      table.string('description', 255).notNullable();
      table.timestamp('created_at').defaultTo(knex.fn.now());
      table.timestamp('updated_at').defaultTo(knex.fn.now());
    }),
    knex.schema.createTableIfNotExists('navigation', function(table) {
      table.increments('id');
      table.uuid('uuid');
      table.string('name').notNullable();
      table.string('label').notNullable();
      table.boolean('restricted').default(false);
      table.enu('location', ['header', 'sidebar', 'footer', 'admin']).defaultTo('header');
      table.json('dropdown');
      table.timestamp('created_at').defaultTo(knex.fn.now());
      table.timestamp('updated_at').defaultTo(knex.fn.now());
      table.index('label');
    }),
    knex.schema.createTableIfNotExists('link', function(table) {
      table.increments('id');
      table.uuid('uuid');
      table.string('label', 50).notNullable();
      table.string('name', 50).notNullable();
      table.integer('position');
      table.string('href').notNullable();
      table.string('icon');
      table.timestamp('created_at').defaultTo(knex.fn.now());
      table.timestamp('updated_at').defaultTo(knex.fn.now());
      table.index('label');
      table.index('uuid');
      table.index('href');
    }),
    knex.schema.createTableIfNotExists('navigation_link', function(table) {
      table.integer('navigation_id').notNullable().references('id').inTable('navigation');
      table.integer('link_id').notNullable().references('id').inTable('link');
      table.primary(['navigation_id', 'link_id']);
    }),
    knex.schema.createTableIfNotExists('gallery', function(table) {
      table.uuid('id').primary();
      table.string('name').unique().notNullable();
      table.string('slug');
      table.string('description');
      table.boolean('restricted').default(false);
      table.enu('status', ['published', 'draft', 'archived']).defaultTo('draft');
      table.timestamp('created_at').defaultTo(knex.fn.now());
      table.timestamp('updated_at').defaultTo(knex.fn.now());
    }),
    knex.schema.createTableIfNotExists('category', function(table) {
      table.uuid('id').primary();
      table.string('name').unique().notNullable();
      table.enu('type', ['article', 'project', 'page', 'media', 'file']);
      table.string('description');
      table.string('icon');
      table.string('slug');
      table.timestamp('created_at').defaultTo(knex.fn.now());
      table.timestamp('updated_at').defaultTo(knex.fn.now());
    }),
    knex.schema.createTableIfNotExists('page', function(table) {
      table.uuid('id').primary();
      table.string('name').unique().notNullable();
      table.string('label');
      table.string('url').unique().notNullable();
      table.json('layout');
      table.json('data');
      table.enu('status', ['published', 'draft', 'archived']).defaultTo('draft');
      table.boolean('restricted').default(false);
      table.json('meta');
      table.timestamp('created_at').defaultTo(knex.fn.now());
      table.timestamp('updated_at').defaultTo(knex.fn.now());
    }),
    knex.schema.createTableIfNotExists('activity', function(table) {
      table.uuid('id').primary();
      table.string('name', 100);
      table.uuid('user_id').references('id').inTable('user').onDelete('restrict').onUpdate('cascade');
      table.string('action').notNullable();
      table.enu('type', ['create', 'update', 'delete', 'register']).notNullable();
      table.json('data');
      table.uuid('entry_uuid').notNullable();
      table.string('entry_table').notNullable();
      table.timestamp('created_at').defaultTo(knex.fn.now());
      table.timestamp('updated_at').defaultTo(knex.fn.now());
    }),
    knex.schema.createTableIfNotExists('attachment_category', function(table) {
      table.uuid('category_id').notNullable().references('id').inTable('category').onDelete('cascade').onUpdate('cascade');
      table.uuid('attachment_id').notNullable().references('id').inTable('attachment').onDelete('cascade').onUpdate('cascade');
      table.primary(['category_id', 'attachment_id']);
    }),
    knex.schema.createTableIfNotExists('post_attachment', function(table) {
      table.uuid('post_id').notNullable().references('id').inTable('post').onDelete('cascade').onUpdate('cascade');
      table.uuid('attachment_id').notNullable().references('id').inTable('attachment').onDelete('cascade').onUpdate('cascade');
      table.primary(['post_id', 'attachment_id']);
    }),
    knex.schema.createTableIfNotExists('gallery_attachment', function(table) {
      table.uuid('gallery_id').notNullable().references('id').inTable('gallery').onDelete('cascade').onUpdate('cascade');
      table.uuid('attachment_id').notNullable().references('id').inTable('attachment').onDelete('cascade').onUpdate('cascade');
      table.primary(['gallery_id', 'attachment_id']);
    })
  ])
};

exports.down = function(knex, Promise) {
  return Promise.all([
    //fk tables
    knex.schema.dropTableIfExists('user'),
    knex.schema.dropTableIfExists('token'),
    knex.schema.dropTableIfExists('role'),
    knex.schema.dropTableIfExists('tag'),
    knex.schema.dropTableIfExists('user_role'),
    knex.schema.dropTableIfExists('post'),
    knex.schema.dropTableIfExists('post_tag'),
    knex.schema.dropTableIfExists('attachment'),
    knex.schema.dropTableIfExists('setting'),
    knex.schema.dropTableIfExists('navigation'),
    knex.schema.dropTableIfExists('link'),
    knex.schema.dropTableIfExists('navigation_link'),
    knex.schema.dropTableIfExists('gallery'),
    knex.schema.dropTableIfExists('category'),
    knex.schema.dropTableIfExists('page'),
    knex.schema.dropTableIfExists('activity'),
    knex.schema.dropTableIfExists('attachment_category'),
    knex.schema.dropTableIfExists('post_attachment'),
    knex.schema.dropTableIfExists('gallery_attachment'),
    knex.schema.dropTableIfExists('attachment_tag')
  ]);
};
