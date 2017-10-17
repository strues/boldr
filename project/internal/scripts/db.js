/* eslint-disable comma-dangle */
const fs = require('fs');
const path = require('path');
const knex = require('knex');
const task = require('./task');

// The list of available commands, e.g. node scripts/db.js migrate:undo
const commands = ['version', 'migrate', 'migrate:undo', 'migration', 'seed', 'reset'];
const command = process.argv[2];

const config = {
  client: 'pg',
  connection: process.env.DATABASE_URL,
  migrations: {
    tableName: 'migrations',
    directory: path.resolve(process.cwd(), '.boldr/db/migrations'),
  },
  seeds: {
    directory: path.resolve(process.cwd(), '.boldr/db/seeds'),
  },
};

// The template for database migration files (see templates/*.js)
const version = new Date().toISOString().substr(0, 16).replace(/\D/g, '');
const template = `module.exports.up = async (db) => {\n  \n};\n
module.exports.down = async (db) => {\n  \n};\n
module.exports.configuration = { transaction: true };\n`;

module.exports = task('db', async () => {
  let db;

  if (!commands.includes(command)) {
    throw new Error(`Unknown command: ${command}`);
  }

  try {
    switch (command) {
      case 'version':
        db = knex(config);
        await db.migrate.currentVersion(config).then(console.log);
        break;
      case 'migration':
        fs.writeFileSync(
          `${process.cwd()}/.boldr/db/migrations/${version}_${process.argv[3] || 'new'}.js`,
          template,
          'utf8',
        ); // eslint-disable-line
        break;
      case 'migrate:undo':
        db = knex(config);
        await db.migrate.rollback(config);
        break;
      case 'seed':
        db = knex(config);
        await db.seed.run(config);
        break;
      case 'reset':
        db = knex(config);
        await dropDatabase(db);
        break;
      default:
        db = knex(config);
        await db.migrate.latest(config);
    }
  } finally {
    if (db) {
      await db.destroy();
    }
  }
});

async function dropDatabase(db) {
  await db.schema.dropTableIfExists('block_relation');
  await db.schema.dropTableIfExists('article_tag');
  await db.schema.dropTableIfExists('user_role');
  await db.schema.dropTableIfExists('template_page');
  await db.schema.dropTableIfExists('menu_menu_detail');
  await db.schema.dropTableIfExists('block');
  await db.schema.dropTableIfExists('article_media');
  await db.schema.dropTableIfExists('media');
  await db.schema.dropTableIfExists('media_type');
  await db.schema.dropTableIfExists('content_type');
  await db.schema.dropTableIfExists('setting');
  await db.schema.dropTableIfExists('activity');
  await db.schema.dropTableIfExists('menu');
  await db.schema.dropTableIfExists('menu_detail');
  await db.schema.dropTableIfExists('template');
  await db.schema.dropTableIfExists('page');
  await db.schema.dropTableIfExists('tag');
  await db.schema.dropTableIfExists('verification_token');
  await db.schema.dropTableIfExists('reset_token');
  await db.schema.dropTableIfExists('article');
  await db.schema.dropTableIfExists('attachment');
  await db.schema.dropTableIfExists('social');
  await db.schema.dropTableIfExists('user');
  await db.schema.dropTableIfExists('role');
  await db.schema.dropTableIfExists('migrations_lock');
  await db.schema.dropTableIfExists('migrations');
  await db.migrate.latest(config);
  await db.seed.run(config);
}
