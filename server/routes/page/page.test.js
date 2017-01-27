import supertest from 'supertest';
import app from '../../app';

function request() {
  return supertest(app);
}

it('GET /pages -- It should return pages', async () => {
  const { status } = await request()
      .get('/api/v1/pages')
      .set('Accept', 'application/json');
  expect(status).toBe(200);
});
