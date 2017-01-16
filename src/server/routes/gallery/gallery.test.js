import supertest from 'supertest';
import listener from '../../index';

function request() {
  return supertest(listener);
}

it('GET /galleries - Lists all galleries', async () => {
  const { status, body } = await request()
    .get('/api/v1/galleries');

  expect(status).toBe(200);
});
