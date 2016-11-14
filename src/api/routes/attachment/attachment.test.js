import chai, { expect } from 'chai';
import supertest from 'supertest';
import server from '../../engine';
import knex from '../../db/postgres';

function request() {
  return supertest(server.listen());
}

describe('API -- Attachment', () => {
  afterEach(() => {
    server.close();
  });
  describe('GET /api/v1/attachments', () => {
    it('It should return media from the db', (done) => {
      request()
        .get('/api/v1/attachments')
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .end((err, res) => {
          expect(res.status).to.equal(200);
          done();
        });
    });
  });
});
