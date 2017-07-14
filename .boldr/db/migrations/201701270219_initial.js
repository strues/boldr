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
    table.string('password', 60).notNullable();
    table.string('firstName', 64).notNullable();
    table.string('lastName', 64).notNullable();
    table.string('username', 64).unique().notNullable();
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
    table.string('description', 255).nullable();
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

  await db.schema.createTable('upload', table => {
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
    table.string('safeName', 128).notNullable();
    table.string('thumbName', 128);
    table.integer('size');
    table.string('fileDescription').nullable();
    table.uuid('userId').unsigned().notNullable();

    table.timestamp('createdAt').defaultTo(db.fn.now());
    table.timestamp('updatedAt').defaultTo(db.fn.now());

    // fk | uuid
    table
      .foreign('userId')
      .references('id')
      .inTable('user')
      .onDelete('cascade')
      .onUpdate('cascade');

    table.index('name');
    table.index('url');
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
    // uuid
    table.uuid('uuid').notNullable().defaultTo(db.raw('uuid_generate_v4()'));
    table.string('name').notNullable();
    table.json('attributes').nullable();
    table.boolean('restricted').default(false);
    table.timestamp('createdAt').notNullable().defaultTo(db.fn.now());
    table.timestamp('updatedAt').nullable().defaultTo(null);

    table.index('uuid');
  });

  await db.schema.createTable('menu_detail', table => {
    table.uuid('id').notNullable().defaultTo(db.raw('uuid_generate_v4()')).primary();
    table.string('safeName', 50).notNullable();
    table.string('title', 50).notNullable();
    table.boolean('hasDropdown').default(false);
    table.string('cssClassname', 255).nullable();
    table.integer('order');
    table.string('mobileHref', 255).nullable().comment(
      'Mobile href is applicable in cases where the item is a dropdown' +
        // prettier-ignore
        'trigger on desktop. Without a mobile href, it will only be text.' // eslint-disable-line
    );
    table.string('href').notNullable();
    table.string('icon').nullable();
    table.jsonb('children');

    table.timestamp('createdAt').notNullable().defaultTo(db.fn.now());
    table.timestamp('updatedAt').nullable().defaultTo(null);
    table.timestamp('deletedAt').nullable().defaultTo(null);

    table.index('title');
    table.index('safeName');
    table.index('href');
  });

  await db.schema.createTable('article_tag', table => {
    table.increments('id').primary();
    table.uuid('articleId').unsigned().notNullable();
    table.uuid('tagId').unsigned().notNullable();
    table.timestamp('createdAt').notNullable().defaultTo(db.fn.now());
    table.timestamp('updatedAt').nullable().defaultTo(null);
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
    table.timestamp('createdAt').notNullable().defaultTo(db.fn.now());
    table.timestamp('updatedAt').nullable().defaultTo(null);
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

  await db.schema.createTable('menu_menu_detail', table => {
    table.integer('menuId').notNullable().references('id').inTable('menu');
    table
      .uuid('menuDetailId')
      .notNullable()
      .references('id')
      .inTable('menu_detail');

    table.timestamp('createdAt').notNullable().defaultTo(db.fn.now());
    table.timestamp('updatedAt').nullable().defaultTo(null);

    table.primary(['menuId', 'menuDetailId']);
  });
};

module.exports.down = async db => {
  await db.schema.dropTableIfExists('role');
  await db.schema.dropTableIfExists('user');
  await db.schema.dropTableIfExists('tag');
  await db.schema.dropTableIfExists('article');
  await db.schema.dropTableIfExists('upload');
  await db.schema.dropTableIfExists('setting');
  await db.schema.dropTableIfExists('menu');
  await db.schema.dropTableIfExists('menu_detail');
  await db.schema.dropTableIfExists('verification_token');
  await db.schema.dropTableIfExists('reset_token');
  await db.schema.dropTableIfExists('article_tag');
  await db.schema.dropTableIfExists('user_role');
  await db.schema.dropTableIfExists('menu_menu_detail');
};

module.exports.configuration = { transaction: true };
