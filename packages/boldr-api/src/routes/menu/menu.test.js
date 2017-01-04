import supertest from 'supertest';
import server from '../../engine';

function request() {
  return supertest(server);
}
it('GET /menus', async () => {
  const { status, body } = await request()
    .get('/api/v1/menus');

  expect(status).toBe(200);
});
