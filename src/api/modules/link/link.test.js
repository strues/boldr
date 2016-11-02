import chai, { expect } from 'chai';
import supertest from 'supertest';
import server from '../../engine';
import knex from '../../db/postgres';

function request() {
  return supertest(server.listen());
}

  describe('GET /api/v1/links', () => {
    afterEach(() => {
      server.close();
    });
    it('It should return links', (done) => {
      request()
        .get('/api/v1/links')
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .end((err, res) => {
          expect(res.status).to.equal(200);
          done();
        });
    });
  });
