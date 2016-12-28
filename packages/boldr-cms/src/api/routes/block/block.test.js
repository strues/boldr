import supertest from 'supertest-as-promised';
import server from '../../engine';

function request() {
  return supertest(server);
}

it('GET /blocks - Lists all blocks', async () => {
  const { status, body } = await request()
    .get('/api/v1/blocks');

  expect(status).toBe(200);
});
