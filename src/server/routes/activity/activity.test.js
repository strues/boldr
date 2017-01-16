import supertest from 'supertest';
import listener from '../../index';

function request() {
  return supertest(listener);
}

it('GET /activities', async () => {
  const { status } = await request()
      .get('/api/v1/activities');

  expect(status).toBe(200);
});
