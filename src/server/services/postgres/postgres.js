import Knex from 'knex';
import { Model } from 'objection';
import knexConfig from '../../../../knexfile';

export const connect = () => {
  const knex = Knex(knexConfig[process.env.NODE_ENV]);
  Model.knex(knex);
  return knex;
};

export const disconnect = (knex) => {
  return new Promise((resolve, reject) => {
    knex.destroy((err) => {
      if (err) {
        reject(err);
      } else {
        resolve();
      }
    });
  });
};
