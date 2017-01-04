import supertest from 'supertest';
import server from '../../engine';

function request() {
  return supertest(server);
}

it('GET /roles - Lists all roles', async () => {
  const { status, body } = await request()
    .get('/api/v1/roles');

  expect(status).toBe(200);
});
