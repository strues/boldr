import supertest from 'supertest';
import listener from '../../index';

function request() {
  return supertest(listener);
}

it('GET /pages -- It should return pages', async () => {
  const { status } = await request()
      .get('/api/v1/pages')
      .set('Accept', 'application/json');
  expect(status).toBe(200);
});
