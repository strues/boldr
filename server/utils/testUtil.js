import * as database from '../services/db';

export const useDatabase = () => {
  let knex

  beforeAll(async () => {
    knex = database.connect()
  })

  afterAll(async () => {
    await database.disconnect()
  })

  beforeEach(async () => {
    await knex.seed.run()
  })
}
