import supertest from 'supertest';
import server from '../../engine';

function request() {
  return supertest(server);
}

it('GET /attachments', async () => {
  const { status } = await request()
      .get('/api/v1/attachments');

  expect(status).toBe(200);
});
