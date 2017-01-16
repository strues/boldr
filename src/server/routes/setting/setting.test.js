import supertest from 'supertest';
import listener from '../../index';

function request() {
  return supertest(listener);
}


it('GET /settings -- List', async () => {
  const { status, body } = await request()
    .get('/api/v1/settings')
    .set('Accept', 'application/json');

  expect(status).toBe(200);
  expect(Array.isArray(body)).toBe(true);
});

it('GET /settings/:id -- Single setting', async () => {
  const { status, body } = await request()
    .get('/api/v1/settings/1')
    .set('Accept', 'application/json');

  expect(status).toBe(200);
  expect(typeof body).toBe('object');
});
