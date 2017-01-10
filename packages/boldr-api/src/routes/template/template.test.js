import supertest from 'supertest';
import server from '../../engine';

function request() {
  return supertest(server);
}

it('GET /templates -- It should return templates', async () => {
  const { status } = await request()
      .get('/api/v1/templates')
      .set('Accept', 'application/json');
  expect(status).toBe(200);
});
