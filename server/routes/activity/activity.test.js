import supertest from 'supertest';
import app from '../../app';

function request() {
  return supertest(app);
}

it('GET /activities', async () => {
  const { status } = await request()
      .get('/api/v1/activities');

  expect(status).toBe(200);
});
