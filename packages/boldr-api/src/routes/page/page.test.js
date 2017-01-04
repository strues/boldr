import supertest from 'supertest';
import server from '../../engine';

function request() {
  return supertest(server);
}

it('GET /pages -- It should return pages', async () => {
  const { status } = await request()
      .get('/api/v1/pages')
      .set('Accept', 'application/json');
  expect(status).toBe(200);
});
