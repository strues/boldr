import { expect } from 'chai';
import supertest from 'supertest';
import server from '../../engine';

function request() {
  return supertest(server.listen());
}

describe('API -- Tag', () => {
  afterEach(() => {
    server.close();
  });
  describe('GET /api/v1/tags', () => {
    it('It should return tags', (done) => {
      request()
        .get('/api/v1/tags')
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(200, done);
    });
  });
});
