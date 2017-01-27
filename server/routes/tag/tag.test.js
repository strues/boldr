import supertest from 'supertest';
import app from '../../app';

function request() {
  return supertest(app);
}


it('GET /tags -- List', async () => {
  const { status, body } = await request()
    .get('/api/v1/tags')
    .set('Accept', 'application/json');

  expect(status).toBe(200);
});
