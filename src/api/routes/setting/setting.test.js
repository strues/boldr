import { expect } from 'chai';
import supertest from 'supertest';
import server from '../../engine';

function request() {
  return supertest(server.listen());
}

describe('GET /api/v1/settings', () => {
  afterEach(() => {
    server.close();
  });
  it('It should return the site settings', (done) => {
    request()
      .get('/api/v1/settings')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(res => {
        expect(res.status).to.equal(200);
        expect(res.body).to.be.an('array');
        expect(res.body[0]).to.be.an('object');
        expect(res.body[0]).to.include.keys('key');
      })
      .end(done);
  });
});

describe('GET /api/v1/settings/:id', () => {
  afterEach(() => {
    server.close();
  });
  it('It should return a single settings object', (done) => {
    request()
      .get('/api/v1/settings/1')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(res => {
        expect(res.status).to.equal(200);
        expect(res.body).to.be.an('object');
        expect(res.body).to.include.keys('key');
      })
      .end(done);
  });
});
