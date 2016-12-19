import supertest from 'supertest-as-promised';
import server from '../../engine';

function request() {
  return supertest(server);
}
it('GET /navigations', async () => {
  const { status, body } = await request()
    .get('/api/v1/navigations');

  expect(status).toBe(200);
});
