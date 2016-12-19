import supertest from 'supertest-as-promised';
import server from '../../engine';

function request() {
  return supertest(server);
}
it('GET /activities', async () => {
  const { status } = await request()
      .get('/api/v1/activities');

  expect(status).toBe(200);
});
