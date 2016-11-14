/**
 * Bootstrap
 * src/api/core/bootstrap
 * Establishes a connection to the database, verifies it, and binds our db models.
 * Verifies application-wide configuration.
 */
import { Model } from 'objection';
import knex from '../db/postgres';
import Setting from '../routes/setting/setting.model';
import logger from './logger';

const startupMessage = `\n
  ------------------------------------------------------------ \n
                    🔧 Loaded BoldrAPI Configuration.
  ------------------------------------------------------------- \n
  If any values are incorrect, edit the files in the config directory.
  You are able to override any settings using the .env file. \n
  `;

class Bootstrap {
  static init() {
    this.initConfig();
    this.initDb();
  }

  static initConfig() {
    logger.info(startupMessage);
  }

  static initDb() {
    logger.info('initDb: Binding to Knex instance and making a test query.');
    // bind Objection models to db instance.
    Model.knex(knex);
    Setting.query()
    .count('*')
    .catch((e) => {
      logger.error('Query failed', { error: e.message, stack: e.stack });
    });
  }
}

export default Bootstrap;
