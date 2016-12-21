import Knex from 'knex';
import knexConfig from '../../../../config/knexfile';

const knex = Knex(knexConfig[process.env.NODE_ENV]);

export default knex;
