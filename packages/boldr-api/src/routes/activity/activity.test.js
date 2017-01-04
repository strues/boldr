import supertest from 'supertest';
import server from '../../engine';

function request() {
  return supertest(server);
}
it('GET /activities', async () => {
  const { status } = await request()
      .get('/api/v1/activities');

  expect(status).toBe(200);
});
