module.exports.up = async db => {
  await db.raw('CREATE EXTENSION IF NOT EXISTS "uuid-ossp"');
  await db.raw('CREATE EXTENSION IF NOT EXISTS "hstore"');

  await db.schema.createTable('role', table => {
    // pk
    table.increments('id').unsigned().primary();
    table.string('name', 64).notNullable().unique();
    table.string('icon', 140).nullable();
    table.text('description').nullable();

    table.timestamp('createdAt').notNullable().defaultTo(db.fn.now());
    table.timestamp('updatedAt').nullable().defaultTo(null);
    table.timestamp('deletedAt').nullable().defaultTo(null);
    // indexes
    table.index('name');
  });

  await db.schema.createTable('category', table => {
    table.uuid('id').notNullable().defaultTo(db.raw('uuid_generate_v4()')).primary();
    table.string('name', 140).unique().notNullable();
    table.string('slug', 140).unique().notNullable();
    table.string('icon', 140).nullable();
    table.text('description').nullable();

    table.timestamp('createdAt').notNullable().defaultTo(db.fn.now());
    table.timestamp('updatedAt').nullable().defaultTo(null);
    table.timestamp('deletedAt').nullable().defaultTo(null);

    table.index('slug');
    table.index('name');
    table.index('createdAt');
  });

  await db.schema.createTable('user', table => {
    // pk
    table
      .uuid('id')
      .notNullable()
      .defaultTo(db.raw('uuid_generate_v4()'))
      .primary();

    table.string('email', 100).unique().notNullable();
    table.string('password', 255).notNullable();
    table.string('firstName', 64).notNullable();
    table.string('lastName', 96).notNullable();
    table.string('username', 64).unique().notNullable();
    table
      .string('avatarUrl', 255)
      .defaultTo('https://boldr.io/images/unknown-avatar.png');
    table.string('profileImage', 255).nullable();
    table.string('location', 100).nullable();
    table.text('bio').nullable();
    table.date('birthday', 8).nullable();
    table.string('website', 255).nullable();
    table.string('language', 5).notNullable().defaultTo('en_US');
    table.boolean('verified').defaultTo(false);

    table.timestamp('lastLogin').nullable().defaultTo(null);

    table.timestamp('createdAt').notNullable().defaultTo(db.fn.now());
    table.timestamp('updatedAt').nullable().defaultTo(null);
    table.timestamp('deletedAt').nullable().defaultTo(null);

    // indexes
    table.index('username');
    table.index('verified');
    table.index('email');
  });

  await db.schema.createTable('verification_token', table => {
    // pk
    table.increments('id').unsigned().primary();
    table.string('ip', 32);
    table.string('token');
    table.boolean('used').defaultTo(false);
    table.uuid('userId').unsigned();
    table.timestamp('createdAt').defaultTo(db.fn.now());
    table.timestamp('updatedAt').nullable().defaultTo(null);
    // fk
    table
      .foreign('userId')
      .references('id')
      .inTable('user')
      .onDelete('cascade')
      .onUpdate('cascade');
    // indexes
    table.index('token');
  });

  await db.schema.createTable('reset_token', table => {
    // pk
    table.increments('id').unsigned().primary();
    table.string('ip', 32);
    table.string('token', 255);
    table.dateTime('expiration');
    table.boolean('used').defaultTo(false);

    table.uuid('userId').unsigned();
    table.timestamp('createdAt').defaultTo(db.fn.now());
    table.timestamp('updatedAt').nullable().defaultTo(null);
    // fk
    table
      .foreign('userId')
      .references('id')
      .inTable('user')
      .onDelete('cascade')
      .onUpdate('cascade');
    // indexes
    table.index('token');
  });

  await db.schema.createTable('tag', table => {
    table.uuid('id').notNullable().defaultTo(db.raw('uuid_generate_v4()')).primary();
    table.string('name', 32).notNullable().unique();

    table.timestamp('createdAt').notNullable().defaultTo(db.fn.now());
    table.timestamp('updatedAt').nullable().defaultTo(null);
    table.timestamp('deletedAt').nullable().defaultTo(null);

    table.index('name');
  });

  await db.schema.createTable('article', table => {
    // pk | uuid
    table
      .uuid('id')
      .notNullable()
      .defaultTo(db.raw('uuid_generate_v4()'))
      .primary();

    table.string('title', 140).unique().notNullable();
    table.string('slug', 140).unique().notNullable();
    table.string('image', 255).nullable();
    table.string('heroImage', 255).nullable();
    table.json('meta').nullable();

    table.json('rawContent').notNullable().comment('Raw immutable JSON content block');
    table.text('content').notNullable().comment('Content is the rawContent converted to HTML');
    table.text('excerpt').notNullable();

    table.boolean('featured').defaultTo(false);
    table.boolean('published').defaultTo(true);
    table.enu('status', ['published', 'archived', 'draft']);

    table.uuid('authorId').unsigned().notNullable();
    table.uuid('categoryId').unsigned().notNullable();

    table.timestamp('createdAt').notNullable().defaultTo(db.fn.now());
    table.timestamp('updatedAt').nullable().defaultTo(null);
    table.timestamp('deletedAt').nullable().defaultTo(null);
    // fk | uuid
    table
      .foreign('authorId')
      .references('id')
      .inTable('user')
      .onDelete('cascade')
      .onUpdate('cascade');

    table
      .foreign('categoryId')
      .references('id')
      .inTable('category')
      .onDelete('cascade')
      .onUpdate('cascade');

    table.index('slug');
    table.index('published');
    table.index('authorId');
    table.index('categoryId');
    table.index('createdAt');
    table.index('status');
  });

  await db.schema.createTable('file', table => {
    // pk
    table
      .uuid('id')
      .notNullable()
      .defaultTo(db.raw('uuid_generate_v4()'))
      .primary();
    table.string('name', 128).notNullable().unique();
    table.string('type', 32).notNullable();
    table.string('url', 125).notNullable();
    table.string('path', 255).notNullable();
    table.integer('size');
    table.string('safeName', 128).notNullable();
    table.string('thumbName', 128);
    table.string('fileDescription').nullable();
    table.uuid('ownerId').notNullable();

    table.timestamp('createdAt').defaultTo(db.fn.now());
    table.timestamp('updatedAt').nullable().defaultTo(null);

    // fk | uuid
    table
      .foreign('ownerId')
      .references('id')
      .inTable('user')
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
    table.timestamp('createdAt').notNullable().defaultTo(db.fn.now());
    table.timestamp('updatedAt').nullable().defaultTo(null);
    table.timestamp('deletedAt').nullable().defaultTo(null);

    table.index('key');
    table.index('value');
  });

  await db.schema.createTable('menu', table => {
    table.increments('id').unsigned().primary();
    table.uuid('uuid').notNullable().defaultTo(db.raw('uuid_generate_v4()'));
    table.string('name', 64).notNullable();
    table.string('safeName', 64).notNullable();
    table.boolean('restricted').default(false);

    // timestamp
    table.timestamp('createdAt').notNullable().defaultTo(db.fn.now());
    table.timestamp('updatedAt').nullable().defaultTo(null);
    table.timestamp('deletedAt').nullable().defaultTo(null);

    // indexes
    table.index('uuid');
  });

  await db.schema.createTable('menu_detail', table => {
    // pk
    table.uuid('id').notNullable().defaultTo(db.raw('uuid_generate_v4()')).primary();

    table.string('safeName', 50).unique().notNullable();
    table.string('title', 50).notNullable();
    table.boolean('hasDropdown').default(false).comment('hasDropdown is true if the item has dropdownItems.');
    table.boolean('isDropdown').default(false).comment('isDropdown is true if the item in question has a parentId.');
    table.string('cssClassname', 32).nullable();
    table.integer('order');
    table.string('href').notNullable();
    table.string('icon').nullable();

    // fk
    table.uuid('parentId').nullable();
    table.integer('menuId').unsigned().references('id').inTable('menu').notNullable();

    // timestamp
    table.timestamp('createdAt').notNullable().defaultTo(db.fn.now());
    table.timestamp('updatedAt').nullable().defaultTo(null);
    table.timestamp('deletedAt').nullable().defaultTo(null);

    table
    .foreign('parentId')
    .references('id')
    .inTable('menu_detail')
    .onDelete('cascade')
    .onUpdate('cascade');

    // indexs
    table.index('title');
    table.index('safeName');
    table.index('href');
    table.index('parentId');
    table.index('menuId');
  });

  await db.schema.createTable('article_tag', table => {
    // pk
    table.increments('id').primary();
    // fk
    table.uuid('articleId').notNullable();
    table.uuid('tagId').notNullable();
    table.unique(['articleId', 'tagId']);

    table
      .foreign('articleId')
      .references('id')
      .inTable('article')
      .onDelete('cascade')
      .onUpdate('cascade');
    table
      .foreign('tagId')
      .references('id')
      .inTable('tag')
      .onDelete('cascade')
      .onUpdate('cascade');
  });

  await db.schema.createTable('user_role', table => {
    // pk
    table.increments('id').primary();
    // fk
    table.uuid('userId').unsigned().notNullable();
    table.integer('roleId').unsigned().notNullable();
    table.unique(['userId', 'roleId']);

    table
      .foreign('userId')
      .references('id')
      .inTable('user')
      .onDelete('cascade')
      .onUpdate('cascade');
    table
      .foreign('roleId')
      .references('id')
      .inTable('role')
      .onDelete('cascade')
      .onUpdate('cascade');
  });
};

module.exports.down = async db => {
  await db.schema.dropTableIfExists('role');
  await db.schema.dropTableIfExists('category');
  await db.schema.dropTableIfExists('user');
  await db.schema.dropTableIfExists('tag');
  await db.schema.dropTableIfExists('article');
  await db.schema.dropTableIfExists('file');
  await db.schema.dropTableIfExists('setting');
  await db.schema.dropTableIfExists('menu');
  await db.schema.dropTableIfExists('menu_detail');
  await db.schema.dropTableIfExists('verification_token');
  await db.schema.dropTableIfExists('reset_token');
  await db.schema.dropTableIfExists('article_tag');
  await db.schema.dropTableIfExists('user_role');
};

module.exports.configuration = { transaction: true };
