module.exports.up = async db => {
  await db.raw('CREATE EXTENSION IF NOT EXISTS "uuid-ossp"');
  await db.raw('CREATE EXTENSION IF NOT EXISTS "hstore"');

  await db.schema.createTable('role', table => {
    // pk
    table.increments('id').unsigned().primary();
    table.string('name', 64).notNullable().unique();
    table.string('icon', 140).nullable();
    table.text('description').nullable();

    table.timestamp('created_at').notNullable().defaultTo(db.fn.now());
    table.timestamp('updated_at').nullable().defaultTo(null);
    table.timestamp('deleted_at').nullable().defaultTo(null);
    // indexes
    table.index('name');
  });

  await db.schema.createTable('category', table => {
    table.uuid('id').notNullable().defaultTo(db.raw('uuid_generate_v1mc()')).primary();
    table.string('name', 140).unique().notNullable();
    table.string('slug', 140).unique().notNullable();
    table.string('icon', 140).nullable();
    table.text('description').nullable();

    table.timestamp('created_at').notNullable().defaultTo(db.fn.now());
    table.timestamp('updated_at').nullable().defaultTo(null);
    table.timestamp('deleted_at').nullable().defaultTo(null);

    table.index('slug');
    table.index('name');
    table.index('created_at');
  });
  await db.schema.createTable('account', table => {
    // pk
    table.uuid('id').notNullable().defaultTo(db.raw('uuid_generate_v1mc()')).primary();

    table.string('email', 100).unique().notNullable();
    table.string('password', 255).notNullable();
    table.boolean('verified').defaultTo(false);
    table.string('ip', 32);
    table.string('reset_token', 255);
    table.dateTime('reset_token_exp');
    table.string('verification_token', 255);
    table.dateTime('verification_token_exp');
    table.timestamp('last_login').nullable().defaultTo(null);

    table.timestamp('created_at').notNullable().defaultTo(db.fn.now());
    table.timestamp('updated_at').nullable().defaultTo(null);
    table.timestamp('deleted_at').nullable().defaultTo(null);

    // indexes
    table.index('verified');
    table.index('email');
  });

  await db.schema.createTable('profile', table => {
    // pk
    table.uuid('id').notNullable().defaultTo(db.raw('uuid_generate_v1mc()')).primary();

    table.string('first_name', 64).notNullable();
    table.string('last_name', 128).notNullable();
    table.string('username', 64).unique().notNullable();
    table
      .string('avatar_url', 255)
      .defaultTo('https://boldr.io/images/unknown-avatar.png');
    table.string('profile_image', 255).nullable();
    table.string('location', 100).nullable();
    table.text('bio').nullable();
    table.date('birthday', 8).nullable();
    table
    .enu('sex', ['male', 'female', 'unknown'])
    .defaultTo('unknown')
    .notNullable();
    table.string('website', 255).nullable();
    table.string('language', 5).notNullable().defaultTo('en_US');

    table.uuid('account_id').unsigned();

    table.timestamp('created_at').notNullable().defaultTo(db.fn.now());
    table.timestamp('updated_at').nullable().defaultTo(null);
    table.timestamp('deleted_at').nullable().defaultTo(null);
    // fk
    table
      .foreign('account_id')
      .references('id')
      .inTable('account')
      .onDelete('cascade')
      .onUpdate('cascade');
    // indexes
    table.index('username');
    table.index('account_id');
  });

  await db.schema.createTable('tag', table => {
    table.uuid('id').notNullable().defaultTo(db.raw('uuid_generate_v1mc()')).primary();
    table.string('name', 32).notNullable().unique();
    table.string('safe_name', 32).notNullable().unique();

    table.timestamp('created_at').notNullable().defaultTo(db.fn.now());
    table.timestamp('updated_at').nullable().defaultTo(null);
    table.timestamp('deleted_at').nullable().defaultTo(null);

    table.index('name');
  });

  await db.schema.createTable('article', table => {
    // pk | uuid
    table.uuid('id').notNullable().defaultTo(db.raw('uuid_generate_v1mc()')).primary();
    table.string('title', 140).unique().notNullable();
    table.string('slug', 140).unique().notNullable();
    table.string('image', 255).nullable();
    table.string('hero_image', 255).nullable();
    table.json('meta').nullable();

    table.json('raw_content').notNullable().comment('Raw immutable JSON content block');
    table.text('content').notNullable().comment('Content is the rawContent converted to HTML');
    table.text('excerpt').notNullable();

    table.boolean('featured').defaultTo(false);
    table.boolean('published').defaultTo(true);
    table.enu('status', ['published', 'archived', 'draft']);

    table.uuid('author_id').unsigned().notNullable();
    table.uuid('category_id').unsigned().notNullable();

    table.timestamp('created_at').notNullable().defaultTo(db.fn.now());
    table.timestamp('updated_at').nullable().defaultTo(null);
    table.timestamp('deleted_at').nullable().defaultTo(null);
    // fk | uuid
    table
      .foreign('author_id')
      .references('id')
      .inTable('account')
      .onDelete('cascade')
      .onUpdate('cascade');

    table
      .foreign('category_id')
      .references('id')
      .inTable('category')
      .onDelete('cascade')
      .onUpdate('cascade');

    table.index('slug');
    table.index('published');
    table.index('author_id');
    table.index('category_id');
    table.index('created_at');
    table.index('status');
  });

  await db.schema.createTable('file', table => {
    // pk
    table.uuid('id').notNullable().defaultTo(db.raw('uuid_generate_v1mc()')).primary();
    table.string('name', 128).notNullable().unique();
    table.string('type', 32).notNullable();
    table.string('url', 125).notNullable();
    table.string('path', 255).notNullable();
    table.integer('size');
    table.string('safe_name', 128).notNullable();
    table.string('thumb_name', 128);
    table.string('file_description').nullable();
    table.uuid('owner_id').notNullable();

    table.timestamp('created_at').notNullable().defaultTo(db.fn.now());
    table.timestamp('updated_at').nullable().defaultTo(null);

    // fk | uuid
    table
      .foreign('owner_id')
      .references('id')
      .inTable('account')
      .onDelete('cascade')
      .onUpdate('cascade');

    table.index('name');
    table.index('url');
    table.index('path');
  });

  await db.schema.createTable('setting', table => {
    table.increments('id').unsigned().primary();
    table.string('key', 100).notNullable();
    table.string('label', 100).notNullable();
    table.string('value', 255).notNullable();
    table.string('description', 255).notNullable();
    table.timestamp('created_at').notNullable().defaultTo(db.fn.now());
    table.timestamp('updated_at').nullable().defaultTo(null);
    table.timestamp('deleted_at').nullable().defaultTo(null);

    table.index('key');
    table.index('value');
  });

  await db.schema.createTable('menu', table => {
    table.increments('id').unsigned().primary();
    table.uuid('uuid').notNullable().defaultTo(db.raw('uuid_generate_v1mc()'));
    table.string('name', 64).notNullable();
    table.string('safe_name', 64).notNullable();
    table.boolean('restricted').default(false);

    // timestamp
    table.timestamp('created_at').notNullable().defaultTo(db.fn.now());
    table.timestamp('updated_at').nullable().defaultTo(null);
    table.timestamp('deleted_at').nullable().defaultTo(null);

    // indexes
    table.index('uuid');
  });

  await db.schema.createTable('menu_detail', table => {
    // pk
    table.uuid('id').notNullable().defaultTo(db.raw('uuid_generate_v1mc()')).primary();

    table.string('safe_name', 50).unique().notNullable();
    table.string('title', 50).notNullable();
    table.boolean('has_dropdown').default(false).comment('hasDropdown is true if the item has dropdownItems.');
    table.boolean('is_dropdown').default(false).comment('isDropdown is true if the item in question has a parentId.');
    table.string('css_classname', 32).nullable();
    table.integer('order');
    table.string('href').notNullable();
    table.string('icon').nullable();

    // fk
    table.uuid('parent_id').nullable();
    table.integer('menu_id').unsigned().references('id').inTable('menu').notNullable();

    // timestamp
    table.timestamp('created_at').notNullable().defaultTo(db.fn.now());
    table.timestamp('updated_at').nullable().defaultTo(null);
    table.timestamp('deleted_at').nullable().defaultTo(null);

    table
    .foreign('parent_id')
    .references('id')
    .inTable('menu_detail')
    .onDelete('cascade')
    .onUpdate('cascade');

    // indexs
    table.index('title');
    table.index('safe_name');
    table.index('href');
    table.index('parent_id');
    table.index('menu_id');
  });

  await db.schema.createTable('article_tag', table => {
    // pk
    table.increments('id').primary();
    // fk
    table.uuid('article_id').notNullable();
    table.uuid('tag_id').notNullable();
    table.unique(['article_id', 'tag_id']);

    table
      .foreign('article_id')
      .references('id')
      .inTable('article')
      .onDelete('cascade')
      .onUpdate('cascade');
    table
      .foreign('tag_id')
      .references('id')
      .inTable('tag')
      .onDelete('cascade')
      .onUpdate('cascade');
  });

  await db.schema.createTable('account_role', table => {
    // pk
    table.increments('id').primary();
    // fk
    table.uuid('account_id').notNullable();
    table.integer('role_id').unsigned().notNullable();
    table.unique(['account_id', 'role_id']);

    table
      .foreign('account_id')
      .references('id')
      .inTable('account')
      .onDelete('cascade')
      .onUpdate('cascade');
    table
      .foreign('role_id')
      .references('id')
      .inTable('role')
      .onDelete('cascade')
      .onUpdate('cascade');
  });
};

module.exports.down = async db => {
  await db.schema.dropTableIfExists('role');
  await db.schema.dropTableIfExists('category');
  await db.schema.dropTableIfExists('account');
  await db.schema.dropTableIfExists('profile');
  await db.schema.dropTableIfExists('tag');
  await db.schema.dropTableIfExists('article');
  await db.schema.dropTableIfExists('file');
  await db.schema.dropTableIfExists('setting');
  await db.schema.dropTableIfExists('menu');
  await db.schema.dropTableIfExists('menu_detail');
  await db.schema.dropTableIfExists('article_tag');
  await db.schema.dropTableIfExists('account_role');
};

module.exports.configuration = { transaction: true };
