import { expect } from 'chai';
import supertest from 'supertest';
import server from '../../engine';

function request() {
  return supertest(server.listen());
}

describe('API -- Users', () => {
  afterEach(() => {
    server.close();
  });
  describe('GET /api/v1/users', () => {
    it('It should return a list of users', (done) => {
      request()
        .get('/api/v1/users')
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(res => {
          expect(res.status).to.equal(200);
          expect(res.body).to.be.an('array');
        })
        .end(done);
    });
    it('It should retrieve an user by id', (done) => {
      request()
        .get('/api/v1/users/1b062e26-df71-48ce-b363-4ae9b966e7a0')
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(res => {
          expect(res.status).to.equal(200);
          expect(res.body).to.be.an('object');
          expect(res.body).to.include.keys('email');
        })
        .end(done);
    });
  });
});
