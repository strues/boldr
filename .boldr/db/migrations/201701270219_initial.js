module.exports.up = async db => {
  await db.raw('CREATE EXTENSION IF NOT EXISTS "uuid-ossp"');
  await db.raw('CREATE EXTENSION IF NOT EXISTS "hstore"');

  await db.schema.createTable('role', table => {
    // pk
    table.increments('id').unsigned().primary();
    // uuid
    table.uuid('uuid').notNullable().defaultTo(db.raw('uuid_generate_v4()'));

    table.string('name', 64).notNullable().unique();
    table.string('image', 200).nullable();
    table.text('description').nullable();

    table.timestamp('createdAt').notNullable().defaultTo(db.fn.now());
    table.timestamp('updatedAt').nullable().defaultTo(null);
    // indexes
    table.index('name');
    table.index('uuid');
  });
  await db.schema.createTable('user', table => {
    // pk
    table
      .uuid('id')
      .notNullable()
      .defaultTo(db.raw('uuid_generate_v4()'))
      .primary();

    table.string('email', 100).unique().notNullable();
    table.string('password', 64).notNullable();
    table.string('firstName', 50).notNullable();
    table.string('lastName', 50).notNullable();
    table.string('username', 115).unique().notNullable();
    table
      .string('avatarUrl', 255)
      .defaultTo('https://boldr.io/images/unknown-avatar.png');
    table.string('profileImage', 255).nullable();
    table.string('location', 100).nullable();
    table.text('bio').nullable();
    table.date('birthday', 8).nullable();
    table.string('website', 100).nullable();
    table.string('language', 10).notNullable().defaultTo('en_US');
    table.boolean('verified').defaultTo(false);

    table.timestamp('createdAt').notNullable().defaultTo(db.fn.now());
    table.timestamp('updatedAt').nullable().defaultTo(null);
    table.timestamp('deletedAt').nullable().defaultTo(null);
    // fk

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
    table.string('token', 255).comment('hashed token');
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
    table.increments('id').unsigned().primary();
    // uuid
    table.uuid('uuid').notNullable().defaultTo(db.raw('uuid_generate_v4()'));
    table.string('name').notNullable().unique();
    table.string('description').nullable();

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
    table.string('featureImage', 255).nullable();
    table.json('meta').nullable();
    table.boolean('featured').defaultTo(false);
    table.json('rawContent');
    table.text('content').notNullable();
    table.text('excerpt').notNullable();
    table.uuid('userId').unsigned().notNullable();
    table.boolean('published').defaultTo(true);
    table.timestamp('createdAt').notNullable().defaultTo(db.fn.now());
    table.timestamp('updatedAt').nullable().defaultTo(null);
    table.timestamp('deletedAt').nullable().defaultTo(null);
    // fk | uuid
    table
      .foreign('userId')
      .references('id')
      .inTable('user')
      .onDelete('cascade')
      .onUpdate('cascade');

    table.index('slug');
    table.index('published');
    table.index('createdAt');
  });
  await db.schema.createTable('attachment', table => {
    // pk | uuid
    table
      .uuid('id')
      .notNullable()
      .defaultTo(db.raw('uuid_generate_v4()'))
      .primary();
    table.string('fileName').notNullable();
    table.string('safeName').notNullable();
    table.string('fileDescription');
    table.string('fileType');
    table.string('path');
    table.uuid('userId').unsigned().notNullable();
    table.string('url').notNullable();

    table.timestamp('createdAt').defaultTo(db.fn.now());
    table.timestamp('updatedAt').defaultTo(db.fn.now());

    table
      .foreign('userId')
      .references('id')
      .inTable('user')
      .onDelete('cascade')
      .onUpdate('cascade');
  });
  await db.schema.createTable('setting', table => {
    table.increments('id').unsigned().primary();
    table.string('key', 100).notNullable();
    table.string('label', 100).notNullable();
    table.string('value', 255).notNullable();
    table.string('description', 255).notNullable();

    table.index('key');
    table.index('value');
  });

  await db.schema.createTable('menu', table => {
    table.increments('id').unsigned().primary();
    // uuid
    table.uuid('uuid').notNullable().defaultTo(db.raw('uuid_generate_v4()'));
    table.string('name').notNullable();
    table.string('safeName').notNullable();
    table.json('attributes').nullable();
    table.boolean('restricted').default(false);

    table.index('safeName');
    table.index('uuid');
  });
  await db.schema.createTable('menu_detail', table => {
    table.increments('id').unsigned().primary();
    // uuid
    table.uuid('uuid').notNullable().defaultTo(db.raw('uuid_generate_v4()'));
    table.string('safeName', 50).notNullable();
    table.string('name', 50).notNullable();
    table.string('cssClassname', 255).nullable();
    table.boolean('hasDropdown').default(false);
    table.integer('order');
    table
      .string('mobileHref', 255)
      .nullable()
      .comment(
        'Mobile href is applicable in cases where the item is a dropdown' +
        'trigger on desktop. Without a mobile href, it will only be text.'); // eslint-disable-line
    table.string('href').notNullable();
    table.string('icon').nullable();
    table.json('children');
    table.index('safeName');
    table.index('uuid');
    table.index('href');
  });

  await db.schema.createTableIfNotExists('template', table => {
    table.increments('id').unsigned().primary();
    table.uuid('uuid');
    table.string('name', 100).unique().notNullable();
    table.string('slug', 110).notNullable();
    table.json('meta');
    table.json('content');
    table.timestamp('createdAt').notNullable().defaultTo(db.fn.now());
    table.timestamp('updatedAt').nullable().defaultTo(null);

    table.index('slug');
    table.index('uuid');
  });

  await db.schema.createTable('page', table => {
    table
      .uuid('id')
      .notNullable()
      .defaultTo(db.raw('uuid_generate_v4()'))
      .primary();
    table.string('name').unique().notNullable();
    table.string('slug').unique();
    table.string('url').unique().notNullable();
    table.json('layout');
    table.json('data');
    table.enu('status', ['published', 'draft', 'archived']).defaultTo('draft');
    table.boolean('restricted').default(false);
    table.json('meta');
    table.timestamp('createdAt').notNullable().defaultTo(db.fn.now());
    table.timestamp('updatedAt').nullable().defaultTo(null);

    table.index('name');
  });

  await db.schema.createTable('activity', table => {
    table
      .uuid('id')
      .notNullable()
      .defaultTo(db.raw('uuid_generate_v4()'))
      .primary();
    table.uuid('userId').unsigned().notNullable();
    table.enu('type', ['create', 'update', 'delete', 'register']).notNullable();
    table.uuid('activityArticle').unsigned();
    table.uuid('activityUser').unsigned();
    table.uuid('activityAttachment').unsigned();
    table.integer('activityTag').unsigned();
    table.integer('activityMenuDetail').unsigned();
    table.integer('activityTemplate').unsigned();
    table.uuid('activityPage').unsigned();
    table.integer('activityRole').unsigned();
    table.timestamp('createdAt').notNullable().defaultTo(db.fn.now());
    table.timestamp('updatedAt').nullable().defaultTo(null);

    table
      .foreign('userId')
      .references('id')
      .inTable('user')
      .onDelete('cascade')
      .onUpdate('cascade');

    table
      .foreign('activityArticle')
      .references('id')
      .inTable('article')
      .onDelete('cascade')
      .onUpdate('cascade');
    table
      .foreign('activityUser')
      .references('id')
      .inTable('user')
      .onDelete('cascade')
      .onUpdate('cascade');
    table
      .foreign('activityAttachment')
      .references('id')
      .inTable('attachment')
      .onDelete('cascade')
      .onUpdate('cascade');
    table
      .foreign('activityTag')
      .references('id')
      .inTable('tag')
      .onDelete('cascade')
      .onUpdate('cascade');
    table
      .foreign('activityMenuDetail')
      .references('id')
      .inTable('menu_detail')
      .onDelete('cascade')
      .onUpdate('cascade');
    table
      .foreign('activityTemplate')
      .references('id')
      .inTable('template')
      .onDelete('cascade')
      .onUpdate('cascade');
    table
      .foreign('activityPage')
      .references('id')
      .inTable('page')
      .onDelete('cascade')
      .onUpdate('cascade');
    table
      .foreign('activityRole')
      .references('id')
      .inTable('role')
      .onDelete('cascade')
      .onUpdate('cascade');
  });

  await db.schema.createTable('article_tag', table => {
    table.increments('id').primary();
    table.uuid('articleId').unsigned().notNullable();
    table.integer('tagId').unsigned().notNullable();

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
    table.increments('id').primary();
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

  await db.schema.createTable('template_page', table => {
    table.increments('id').primary();
    table.uuid('pageId').unsigned().notNullable();
    table.integer('templateId').unsigned().notNullable();

    table.unique(['pageId', 'templateId']);
    table
      .foreign('pageId')
      .references('id')
      .inTable('page')
      .onDelete('cascade')
      .onUpdate('cascade');
    table
      .foreign('templateId')
      .references('id')
      .inTable('template')
      .onDelete('cascade')
      .onUpdate('cascade');
  });
  await db.schema.createTable('menu_menu_detail', table => {
    table.integer('menuId').notNullable().references('id').inTable('menu');
    table
      .integer('menuDetailId')
      .notNullable()
      .references('id')
      .inTable('menu_detail');
    table.primary(['menuId', 'menuDetailId']);
  });
};

module.exports.down = async db => {
  await db.schema.dropTableIfExists('role');
  await db.schema.dropTableIfExists('user');
  await db.schema.dropTableIfExists('tag');
  await db.schema.dropTableIfExists('article');
  await db.schema.dropTableIfExists('attachment');
  await db.schema.dropTableIfExists('setting');
  await db.schema.dropTableIfExists('menu');
  await db.schema.dropTableIfExists('menu_detail');
  await db.schema.dropTableIfExists('template');
  await db.schema.dropTableIfExists('page');
  await db.schema.dropTableIfExists('activity');
  await db.schema.dropTableIfExists('verification_token');
  await db.schema.dropTableIfExists('reset_token');
  await db.schema.dropTableIfExists('article_tag');
  await db.schema.dropTableIfExists('user_role');
  await db.schema.dropTableIfExists('template_page');
  await db.schema.dropTableIfExists('menu_menu_detail');
};

module.exports.configuration = { transaction: true };
