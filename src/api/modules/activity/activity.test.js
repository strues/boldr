import supertest from 'supertest';
import server from '../../engine';

function request() {
  return supertest(server.listen());
}

describe('API -- Activity', () => {
  afterEach(() => {
    server.close();
  });
  describe('GET /api/v1/activities', () => {
    it('It should return status 200', (done) => {
      request()
        .get('/api/v1/activities')
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(200, done);
    });
  });
});
