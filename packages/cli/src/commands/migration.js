import path from 'path';
import fs from 'fs-extra';
import logger from '@boldr/utils/lib/logger';
import appRoot from '@boldr/utils/lib/node/appRoot';

const version = new Date()
  .toISOString()
  .substr(0, 16)
  .replace(/\D/g, '');

const template = `module.exports.up = async (db) => {\n  \n};\n
module.exports.down = async (db) => {\n  \n};\n
module.exports.configuration = { transaction: true };\n`;

function task(args, options) {
  logger.task('Creating a new migration');

  const rootDir = appRoot.get();
  fs.outputFileSync(
    `${rootDir}/.boldr/db/migrations/${version}_${options.name || 'new'}.js`,
    template,
    'utf8',
  );
}

function register(program) {
  program
    .command('migration', 'Create a new Knex migration file.')
    .help('Files are saved to `.boldr/db/migrations`')
    .option('-n, --name', 'Name of your migration', program.STRING)
    .action(task);
}

export default { register };
