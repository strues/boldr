import supertest from 'supertest';
import listener from '../../index';

function request() {
  return supertest(listener);
}


it('GET /tags -- List', async () => {
  const { status, body } = await request()
    .get('/api/v1/tags')
    .set('Accept', 'application/json');

  expect(status).toBe(200);
});
