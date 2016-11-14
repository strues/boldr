import chai, { expect } from 'chai';
import supertest from 'supertest';
import server from '../../engine';
import knex from '../../db/postgres';

function request() {
  return supertest(server.listen());
}

describe('API -- Page', () => {
  afterEach(() => {
    server.close();
  });
  describe('GET /api/v1/pages', () => {
    it('It should return pages', (done) => {
      request()
        .get('/api/v1/pages')
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .end((err, res) => {
          expect(res.status).to.equal(200);
          done();
        });
    });
  });
});
