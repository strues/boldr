/* eslint-disable new-cap, require-await, no-param-reassign */
import Knex from 'knex';
import { Model } from 'objection';

import config from '@boldr/config';

let knex;

function dbConnect() {
  if (!knex) {
    knex = Knex({
      client: 'pg',
      connection: config.get('db.url'),
      searchPath: 'knex,public',
      pool: {
        min: 2,
        max: 10,
      },
      migrations: {
        tableName: 'migrations',
      },
      debug: process.env.DATABASE_DEBUG === 'true',
    });
    Model.knex(knex);
  }

  return knex;
}

async function dbDisconnect(knex) {
  return new Promise((resolve, reject) => {
    if (!knex) {
      resolve();
      return;
    }

    knex.destroy(error => {
      if (error) {
        reject(error);
      } else {
        knex = null;
        resolve();
      }
    });
  });
}

export { dbConnect, dbDisconnect };
