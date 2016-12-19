/**
 * Bootstrap
 * src/api/core/bootstrap
 * Establishes a connection to the database, verifies it, and binds our db models.
 * Verifies application-wide configuration.
 */
import { Model } from 'objection';
import knex from 'services/postgres';
import Setting from '../routes/setting/setting.model';
import logger from './logger';

const startupMessage = `\n
  ------------------------------------------------------------ \n
                  🚀 Loaded BoldrAPI Configuration.
  ------------------------------------------------------------- \n
  `;

class bootstrap {
  static init() {
    this.initConfig();
    this.initDb();
    this.validateEnvVars();
  }

  static initConfig() {
    logger.info(startupMessage);
  }
  static validateEnvVars() {
    this.validateNodeEnv();
  }
  static validateNodeEnv() {
  // Check to see that the `process.env.NODE_ENV has been
  // set to an appropriate value of `development`, `production`
  // or `test`. If not, alert the user and default to `development`

    switch (process.env.NODE_ENV) {
      case 'development':
        logger.info(`✳️  Node environment set for ${process.env.NODE_ENV}`);
        break;

      case 'production':
        logger.info(`✳️  Node environment set for ${process.env.NODE_ENV}`);
        break;

      case 'test':
        logger.info(`✳️  Node environment set for ${process.env.NODE_ENV}`);
        break;

      default:
        logger.error('Error: process.env.NODE_ENV should be set to a valid '
        + ' value such as \'production\', \'development\', or \'test\'.');
        logger.info(`Value received: ${process.env.NODE_ENV}`);
        logger.info('Defaulting value for: development');
        process.env.NODE_ENV = 'development';
        break;
    }

    return;
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

export default bootstrap;
